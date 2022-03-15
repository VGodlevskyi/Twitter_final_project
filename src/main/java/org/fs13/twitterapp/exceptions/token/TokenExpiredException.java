package org.fs13.twitterapp.exceptions.token;

public class TokenExpiredException extends RuntimeException {
  public TokenExpiredException(String msg) {
    super(msg);
  }

  private static RuntimeException ex() {
    throw new TokenExpiredException("token expired");
  }

  public static RuntimeException TokenExpired = ex();

}
