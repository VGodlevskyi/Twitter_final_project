package org.fs13.twitterapp.exceptions.token;

public class TokenNotFoundException extends RuntimeException {
  public TokenNotFoundException(String msg) {
    super(msg);
  }

  private static RuntimeException ex() {
    throw new TokenNotFoundException("token not found");
  }

  public static RuntimeException TokenNotFound = ex();

}
