package org.fs13.twitterapp.listeners;

import lombok.Getter;
import org.fs13.twitterapp.entity.user.User;
import org.springframework.context.ApplicationEvent;

@Getter
public class RegistrationCompleteEvent extends ApplicationEvent {

  private final String confirmationUrl;
  private final User user;

  public RegistrationCompleteEvent(String confirmationUrl, User user) {
    super(user);
    this.confirmationUrl = confirmationUrl;
    this.user = user;
  }
}
