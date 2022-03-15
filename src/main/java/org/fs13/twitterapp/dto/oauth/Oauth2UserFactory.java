package org.fs13.twitterapp.dto.oauth;

import org.fs13.twitterapp.exceptions.NotImplementedException;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;

import java.util.Map;

public class Oauth2UserFactory {
    private final static String GOOGLE = "google";

    public static OAuth2UserInfo getUser(OAuth2UserRequest oAuth2UserRequest, Map<String, Object> attributes) {
        String providerId = oAuth2UserRequest.getClientRegistration().getRegistrationId();
        OAuth2UserInfo oAuth2User;

        switch (providerId) {
            case GOOGLE:
                oAuth2User = new GoogleUserInfo(attributes);
                break;
            default: throw new NotImplementedException(String.format("%s oauth processing not implemented yet", providerId));
        }

        return oAuth2User;
    }
}
