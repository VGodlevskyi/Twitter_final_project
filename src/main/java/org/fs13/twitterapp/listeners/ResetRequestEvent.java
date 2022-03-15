package org.fs13.twitterapp.listeners;

import lombok.Getter;
import org.fs13.twitterapp.entity.user.User;
import org.springframework.context.ApplicationEvent;

@Getter
public class ResetRequestEvent extends ApplicationEvent {
  private final String resetPass;
  private final User user;

  public ResetRequestEvent(String resetPass, User user) {
    super(user);
    this.resetPass = resetPass;
    this.user = user;
  }

}
