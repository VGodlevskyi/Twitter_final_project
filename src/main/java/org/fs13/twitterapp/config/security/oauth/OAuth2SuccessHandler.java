package org.fs13.twitterapp.config.security.oauth;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.entity.user.Oauth2UserImp;
import org.fs13.twitterapp.repository.OAuth2CookieRepo;
import org.fs13.twitterapp.service.impl.auth.tokens.JwtService;
import org.fs13.twitterapp.util.CookieHelper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

import static org.fs13.twitterapp.config.security.SecurityConfig.OAUTH_REDIRECT_MAP;
import static org.fs13.twitterapp.repository.OAuth2CookieRepo.OAUTH2_AUTH_REDIRECT;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
   private final JwtService jwtService;
   private final OAuth2CookieRepo oAuth2CookieRepo;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var redirected = getCredentialsUrl(request, response, authentication);
        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + redirected);
            return;
        }
        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, redirected);
    }

    protected String getCredentialsUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri =
                CookieHelper
                .getCookie(request, OAUTH2_AUTH_REDIRECT)
                .map(Cookie::getValue);

        if (redirectUri.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "redirect uri not set");
        }

        if (!OAUTH_REDIRECT_MAP.containsValue(redirectUri.get())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,String.format("%s is not authorized for redirect", redirectUri));
        }

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
        Oauth2UserImp oauth2User = (Oauth2UserImp) authentication.getPrincipal();
        String accessToken  = jwtService.oauth2AccessToken(oauth2User);
        String refreshToken = jwtService.oauth2RefreshToken(oauth2User);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("access_token", accessToken)
                .queryParam("refresh_token", refreshToken)
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        oAuth2CookieRepo.removeAuthorizationRequestCookies(request, response);
    }

}
