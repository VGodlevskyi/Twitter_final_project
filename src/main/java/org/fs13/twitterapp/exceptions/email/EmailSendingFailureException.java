package org.fs13.twitterapp.exceptions.email;

public class EmailSendingFailureException extends RuntimeException {
  public EmailSendingFailureException(String msg) {
    super(msg);
  }

  private static RuntimeException ex() {
    throw new EmailSendingFailureException("token already confirmed");
  }

  public static RuntimeException EmailSendingFailure = ex();
}
