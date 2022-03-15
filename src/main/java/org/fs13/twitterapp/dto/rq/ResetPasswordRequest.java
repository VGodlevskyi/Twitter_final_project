package org.fs13.twitterapp.dto.rq;

import lombok.Data;

import javax.validation.constraints.Email;

@Data

public class ResetPasswordRequest {
  @Email
  private String email;
}
