package org.fs13.twitterapp.config.security;

import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.config.security.filter.UserAuthorizationFilter;
import org.fs13.twitterapp.repository.OAuth2CookieRepo;
import org.fs13.twitterapp.service.impl.auth.oauth.OAuth2UserServiceImpl;
import org.fs13.twitterapp.service.impl.auth.tokens.JwtService;
import org.fs13.twitterapp.config.security.oauth.OAuth2FailureHandler;
import org.fs13.twitterapp.config.security.oauth.OAuth2SuccessHandler;
import org.fs13.twitterapp.service.impl.user.UserDetailsServiceImp;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsServiceImp userDetailsServiceImp;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserAuthorizationFilter authorizationFilter;
    private final OAuth2CookieRepo oAuth2CookieRepo;
    private final OAuth2UserServiceImpl oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2FailureHandler oAuth2FailureHandler;

    public final static Map<String, String> OAUTH_REDIRECT_MAP =
            Map.of( "dev1", "http://localhost:8082/oauth2/login",
                    "dev2", "http://localhost:3000/oauth2/login",
                    "prod", "https://twitterapp13.herokuapp.com/oauth2/login");

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        final String[] allowedOrigins = {"http://localhost:8082", "http://localhost:3000", "https://twitterapp13.herokuapp.com"};
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        corsConfiguration.setAllowedOrigins(List.of(allowedOrigins));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT", "OPTIONS", "PATCH", "DELETE"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setExposedHeaders(List.of("Authorization"));

        http.cors().configurationSource(rq -> corsConfiguration);
        http.csrf().disable();
        http.httpBasic().disable();
        http.headers().frameOptions().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/api/v*/auth/**").permitAll()
                .antMatchers("/api/v*/upload/**").permitAll()
                .antMatchers("/oauth2/**").permitAll()
                .antMatchers("/").permitAll()
                .antMatchers(
                        "/ws/**/**",
                        "/ws/**",
                        "/ws/success",
                        "/ws/socket",
                        "/ws/success").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .oauth2Login().authorizationEndpoint().baseUri("/oauth2/auth")
                .authorizationRequestRepository(oAuth2CookieRepo)
                .and()
                .redirectionEndpoint()
                .baseUri("/oauth2/callback/*")
                .and()
                .userInfoEndpoint()
                .userService(oAuth2UserService)
                .and()
                .successHandler(oAuth2SuccessHandler)
                .failureHandler(oAuth2FailureHandler);

                http
                .logout().permitAll()
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .addLogoutHandler(new SecurityContextLogoutHandler());

        http.addFilterBefore(authorizationFilter, UsernamePasswordAuthenticationFilter.class);
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userDetailsServiceImp);

        return provider;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public Algorithm jwtEncodingAlgorithmBean() {
        return jwtService.getJwtDetails().getAlgorithm();
    }
}
