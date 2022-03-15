package org.fs13.twitterapp.listeners;

import lombok.extern.slf4j.Slf4j;
import org.fs13.twitterapp.entity.email.ResetPasswordEmail;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.service.api.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ResetPasswordListener {
  @Autowired
  private EmailService emailService;

  @EventListener
  public void onApplicationEvent(ResetRequestEvent resetRequestEvent) {
    User user = resetRequestEvent.getUser();
    String userFullName = user.getName() + " " + user.getSurname();
    ResetPasswordEmail email =
            new ResetPasswordEmail(userFullName, user.getEmail(), resetRequestEvent.getResetPass());
    emailService.send(email.getMessage());
  }
}
