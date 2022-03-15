package org.fs13.twitterapp.repository;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import org.fs13.twitterapp.util.CookieHelper;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Repository
public class OAuth2CookieRepo implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {
    public static final String OAUTH2_AUTH_REQUEST = "oauth2_request";
    public static final String OAUTH2_AUTH_REDIRECT = "oauth2_redirect";
    private final int cookieExpiration = 60;

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        return CookieHelper.getCookie(request, OAUTH2_AUTH_REQUEST)
                .map(cookie -> CookieHelper.deserialize(cookie, OAuth2AuthorizationRequest.class))
                .orElse(null);
    }

    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request, HttpServletResponse response) {
        if (authorizationRequest == null) {
            CookieHelper.deleteCookie(request, response, OAUTH2_AUTH_REQUEST);
            CookieHelper.deleteCookie(request, response, OAUTH2_AUTH_REDIRECT);
            return;
        }

        CookieHelper.addCookie(response, OAUTH2_AUTH_REQUEST, CookieHelper.serialize(authorizationRequest), cookieExpiration);
        String redirectUriAfterLogin = request.getParameter(OAUTH2_AUTH_REDIRECT);
        if (StringUtils.isNotBlank(redirectUriAfterLogin)) {
            CookieHelper.addCookie(response, OAUTH2_AUTH_REDIRECT, redirectUriAfterLogin, cookieExpiration);
        }
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request) {
        return this.loadAuthorizationRequest(request);
    }

    public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {
        CookieHelper.deleteCookie(request, response,OAUTH2_AUTH_REQUEST);
        CookieHelper.deleteCookie(request, response, OAUTH2_AUTH_REDIRECT);
    }
}
