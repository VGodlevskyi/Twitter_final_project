package org.fs13.twitterapp.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.entity.user.User;

@RequiredArgsConstructor
@Getter
public class UserResetDetails {
  private final User user;
  private final String resetPass;
}
