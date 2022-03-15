package org.fs13.twitterapp.exceptions.user;

public class UserAlreadyExistsException extends RuntimeException {
  public UserAlreadyExistsException(String msg) {
    super(msg);
  }

  private static RuntimeException ex() {
    throw new UserAlreadyExistsException("user has already been registered");
  }

  public static RuntimeException UserAlreadyExists = ex();
}
