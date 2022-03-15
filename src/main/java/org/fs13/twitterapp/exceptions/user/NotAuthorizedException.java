package org.fs13.twitterapp.exceptions.user;

public class NotAuthorizedException extends Exception {

    public static String PERMISSION_DENIED = "Permission denied.";

    public NotAuthorizedException(String message) {
        super(message);
    }
}
