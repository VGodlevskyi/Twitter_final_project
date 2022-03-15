package org.fs13.twitterapp.exceptions.user;

public class NotFoundException extends RuntimeException {

    public static String EMAIL_NOT_FOUND = "User with such email not found";

    public NotFoundException(String message) {
        super(message);
    }
}
