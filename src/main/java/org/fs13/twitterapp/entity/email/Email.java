package org.fs13.twitterapp.entity.email;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Email {
  private final String subject;
  private final String receiver;
  private final String sender;
  private final String content;
}
