package com.capitalvantage.backend.exception;

public class UserConfigNotFoundException extends RuntimeException {

    public UserConfigNotFoundException(String message) {
        super(message);
    }
}
