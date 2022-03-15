package org.fs13.twitterapp.service.api;

import org.fs13.twitterapp.entity.email.Email;

public interface EmailService {
  void send(String to, String from, String subject, String content);
  void send(Email email);
}
