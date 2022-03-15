package org.fs13.twitterapp.service.impl.auth.tokens;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.repository.RefreshTokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Getter
@PropertySource("classpath:jwt.properties")
public class JwtRefreshService {

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

  private List<String> authorities(User userDetails) {
    return userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());
  }

  public String accessToken(User userDetails, HttpServletRequest request) {
    return JWT.create()
            .withSubject(userDetails.getUsername())
            .withExpiresAt(new Date(System.currentTimeMillis() + jwtDetails.getExpirationStd()))
            .withIssuer(request.getRequestURI())
            .withClaim(
                    "roles",
                    authorities(userDetails)
            )
            .sign(jwtDetails.getAlgorithm());
  }

  public Optional<String> refreshAccess(String refreshToken, User userDetails, HttpServletRequest request) {
    return repo.findByToken(refreshToken)
            .isPresent()?
            Optional.of(accessToken(userDetails, request)) : Optional.empty();
  }
}
