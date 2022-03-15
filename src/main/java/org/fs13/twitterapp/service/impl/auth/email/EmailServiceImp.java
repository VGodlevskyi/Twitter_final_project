package org.fs13.twitterapp.service.impl.auth.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fs13.twitterapp.entity.email.Email;
import org.fs13.twitterapp.service.api.EmailService;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import static org.fs13.twitterapp.exceptions.email.EmailSendingFailureException.EmailSendingFailure;

@Service
@Async
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImp implements EmailService {
  private final JavaMailSender mailSender;

  @Override
  public void send(String to, String from, String subject, String content) {
    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

      helper.setFrom(from);
      helper.setText(content, true);
      helper.setTo(to);
      helper.setSubject(subject);
      mailSender.send(mimeMessage);

    } catch (MessagingException exception) {
      log.error("Failed to send email", exception);
      throw EmailSendingFailure;
    }
  }

  @Override
  public void send(Email email) {
    send(email.getReceiver(), email.getSender(), email.getSubject(), email.getContent());
  }

}
