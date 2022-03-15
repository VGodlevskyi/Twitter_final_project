package org.fs13.twitterapp.service.impl.auth.tokens;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.entity.RefreshToken;
import org.fs13.twitterapp.entity.user.Oauth2UserImp;
import org.fs13.twitterapp.repository.RefreshTokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Getter
@PropertySource("classpath:jwt.properties")
public class JwtService {

  @Autowired
  private RefreshTokenRepo repo;

  @Value("${jwt.secret}")
  private String secret;
  @Value("${jwt.expiration.access}")
  private Long expirationAccess;
  @Value("${jwt.expiration.refresh}")
  private Long expirationRefresh;
  @Value("${jwt.expiration.remember}")
  private Long expirationRemember;
  private JwtDetails jwtDetails;

  @PostConstruct
  public void construct() {
    jwtDetails = new JwtDetails(
            secret,
            expirationAccess,
            expirationRefresh,
            expirationRemember,
            Algorithm.HMAC256(secret.getBytes())
    );
  }

  private List<String> authorities (UserDetails userDetails) {
    return userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());
  }

  public String accessToken(User userDetails) {
    return JWT.create()
            .withSubject(userDetails.getUsername())
            .withExpiresAt(new Date(System.currentTimeMillis() + jwtDetails.getExpirationStd()))
            .withClaim(
                    "roles",
                    authorities(userDetails)
            )
            .sign(jwtDetails.getAlgorithm());
  }

  public String refreshToken(User userDetails) {
    String token = JWT.create()
            .withSubject(userDetails.getUsername())
            .withExpiresAt(new Date(System.currentTimeMillis() + expirationRefresh))
            .withClaim(
                    "roles",
                    authorities(userDetails)
            )
            .sign(jwtDetails.getAlgorithm());

    repo.save(new RefreshToken(token));
    return token;
  }

  public String oauth2AccessToken(Oauth2UserImp user) {
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + expirationAccess);
    return JWT.create()
            .withSubject(user.getEmail())
            .withIssuedAt(new Date())
            .withExpiresAt(expiryDate)
            .withClaim("roles", authorities(user))
            .sign(jwtDetails.getAlgorithm());
  }

  public String oauth2RefreshToken(Oauth2UserImp user) {
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + expirationRefresh);
    String token = JWT.create()
                      .withSubject(user.getEmail())
                      .withIssuedAt(new Date())
                      .withExpiresAt(expiryDate)
                      .withClaim("roles", authorities(user))
                      .sign(jwtDetails.getAlgorithm());
    repo.save(new RefreshToken(token));
    return token;
  }

  public UsernamePasswordAuthenticationToken decode(String token) {
    JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(secret.getBytes())).build();
    DecodedJWT decodedJWT = jwtVerifier.verify(token);
    String username = decodedJWT.getSubject();
    Collection<GrantedAuthority> authorities = new ArrayList<>();
    Arrays.stream(decodedJWT.getClaim("roles")
            .asArray(String.class))
            .forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));

    return new UsernamePasswordAuthenticationToken(username, null, authorities);
  }
}
