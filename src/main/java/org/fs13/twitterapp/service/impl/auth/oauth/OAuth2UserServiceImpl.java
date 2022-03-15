package org.fs13.twitterapp.service.impl.auth.oauth;

import org.fs13.twitterapp.dto.oauth.OAuth2UserInfo;
import org.fs13.twitterapp.dto.oauth.Oauth2UserFactory;
import org.fs13.twitterapp.entity.user.Oauth2UserImp;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.entity.user.UserRole;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        return handleOauth2User(oAuth2UserRequest, oAuth2User);
    }

    private OAuth2User handleOauth2User(OAuth2UserRequest userRequest, OAuth2User oauthUser) {
        OAuth2UserInfo oAuth2UserInfo = Oauth2UserFactory.getUser(userRequest, oauthUser.getAttributes());

        if(oAuth2UserInfo.getEmail().isEmpty()) {
            throw new NotFoundException("account provided by oauth provider is not applicable for this app");
        }

        Optional<User> userOptional = userRepo.findByEmail(oAuth2UserInfo.getEmail());
        User user = userOptional.orElseGet(() -> registerNewUser(userRequest, oAuth2UserInfo));
        return Oauth2UserImp.create(user, oauthUser.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName().split(" ")[0]);
        user.setSurname(oAuth2UserInfo.getName().split(" ")[1]);
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setAvatarUrl(oAuth2UserInfo.getImageUrl());
        user.setRole(UserRole.USER);
        user.setOrigin(oAuth2UserInfo.getProvider());
        user.setEnabled(true);
        return userRepo.save(user);
    }
}
