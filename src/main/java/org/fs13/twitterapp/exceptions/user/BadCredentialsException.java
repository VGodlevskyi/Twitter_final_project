package org.fs13.twitterapp.exceptions.user;

public class BadCredentialsException extends RuntimeException {
  public static String BAD_CREDENTIALS = "Provied creditials do not match";

  public BadCredentialsException(String msg) {
    super(msg);
  }
}
