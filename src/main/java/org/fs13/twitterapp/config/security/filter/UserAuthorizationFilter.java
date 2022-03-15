package org.fs13.twitterapp.config.security.filter;

import org.fs13.twitterapp.service.impl.auth.tokens.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Component
public class UserAuthorizationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {

       extractToken(httpServletRequest)
               .map(t -> jwtService.decode(t))
               .ifPresent(auth -> {
                   auth.setDetails(new WebAuthenticationDetails(httpServletRequest));
                   SecurityContextHolder
                           .getContext()
                           .setAuthentication(auth);
               });

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private Optional<String> extractToken(HttpServletRequest rq) {
        String prefix = "Bearer ";
        return Optional.ofNullable(rq.getHeader(AUTHORIZATION))
                .filter(h -> h.startsWith(prefix))
                .map(h -> h.substring(prefix.length()));
    }
}
