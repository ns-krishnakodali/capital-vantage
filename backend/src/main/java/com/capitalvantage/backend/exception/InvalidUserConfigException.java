package com.capitalvantage.backend.exception;

public class InvalidUserConfigException extends RuntimeException {

    public InvalidUserConfigException(String message) {
        super(message);
    }
}
