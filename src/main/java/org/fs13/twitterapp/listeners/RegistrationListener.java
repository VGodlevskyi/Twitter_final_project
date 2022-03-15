package org.fs13.twitterapp.listeners;

import org.fs13.twitterapp.entity.email.ConfirmationEmail;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.service.api.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;


@Component
public class RegistrationListener {

  @Autowired
  private EmailService emailService;

  @EventListener
  public void onApplicationEvent(final RegistrationCompleteEvent event) {
    this.confirmRegistration(event);
  }

  private void confirmRegistration(RegistrationCompleteEvent event) {
    User user = event.getUser();
    String userFullName = user.getName() + " " + user.getSurname();
    ConfirmationEmail confirmationEmail = new ConfirmationEmail(userFullName, user.getEmail(), event.getConfirmationUrl());
    emailService.send(confirmationEmail.getMessage());
  }

}
