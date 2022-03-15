package org.fs13.twitterapp.service.impl.auth.tokens;

import com.auth0.jwt.algorithms.Algorithm;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JwtDetails {
  private String secret;
  private Long expirationStd;
  private Long expirationRemember;
  private Long expirationRefresh;
  private Algorithm algorithm;
}
