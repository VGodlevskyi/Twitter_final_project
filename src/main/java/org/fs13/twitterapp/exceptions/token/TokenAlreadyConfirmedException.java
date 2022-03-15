package org.fs13.twitterapp.exceptions.token;

public class TokenAlreadyConfirmedException extends RuntimeException {
  public TokenAlreadyConfirmedException(String msg) {
    super(msg);
  }

  private static RuntimeException ex() {
    throw new TokenAlreadyConfirmedException("token already confirmed");
  }

  public static RuntimeException TokenAlreadyConfirmed = ex();
}
