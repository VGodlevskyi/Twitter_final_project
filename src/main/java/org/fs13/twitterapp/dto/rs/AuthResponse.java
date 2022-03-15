package org.fs13.twitterapp.dto.rs;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
public class AuthResponse {
  private final String accessToken;
  private final String refreshToken;

}
