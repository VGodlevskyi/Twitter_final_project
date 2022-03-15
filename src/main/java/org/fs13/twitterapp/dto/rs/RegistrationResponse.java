package org.fs13.twitterapp.dto.rs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegistrationResponse {
  public static final String  REGISTRATION_ERROR = "Account with such email has already been registered";
  public static final String REGISTRATION_SUCCESS = "Account has been successfully created. Please check email to activate your account";
  private String message;

  public static RegistrationResponse of(String message) {
    return new RegistrationResponse(message);
  }
}
