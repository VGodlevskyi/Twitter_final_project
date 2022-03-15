package org.fs13.twitterapp.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fs13.twitterapp.service.impl.auth.tokens.JwtRefreshService;
import org.fs13.twitterapp.service.impl.user.UserDetailsServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v0/token/refresh")
public class RefreshTokenController {

  private final JwtRefreshService jwtRefreshService;
  private final UserDetailsServiceImp userDetails;

  @GetMapping
  public void refreshToken(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {
    String authHeader = httpServletRequest.getHeader("refresh-token");

    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      try {
        String refreshTokenReceived = authHeader.substring("Bearer ".length());
        JWTVerifier jwtVerifier = JWT.require(jwtRefreshService.getJwtDetails().getAlgorithm()).build();
        DecodedJWT decodedJWT = jwtVerifier.verify(refreshTokenReceived);
        User user = (User) userDetails.loadUserByUsername(decodedJWT.getSubject());
        String accessToken = jwtRefreshService
                .refreshAccess(refreshTokenReceived, user, httpServletRequest)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid token"));

        Map<String, String> tokens = new HashMap<>() {{
          put("access_token", accessToken);
        }};

        httpServletResponse.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(httpServletResponse.getOutputStream(), tokens);

      } catch (Exception exception) {
        log.error(exception.getMessage());
        httpServletResponse.setStatus(FORBIDDEN.value());

        Map<String, String> payload = new HashMap<>() {{
          put("error_message", String.format("Login error: %s", exception.getMessage()));
        }};

        httpServletResponse.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(httpServletResponse.getOutputStream(), payload);
      }
    }
  }
}
