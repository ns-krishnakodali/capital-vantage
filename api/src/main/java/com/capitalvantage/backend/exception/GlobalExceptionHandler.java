package com.capitalvantage.backend.exception;

import com.capitalvantage.backend.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserConfigNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserConfigNotFound(UserConfigNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(exception.getMessage()));
    }

    @ExceptionHandler(InvalidUserConfigException.class)
    public ResponseEntity<ErrorResponse> handleInvalidUserConfig(InvalidUserConfigException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(exception.getMessage()));
    }

    @ExceptionHandler(UserConfigIntegrityException.class)
    public ResponseEntity<ErrorResponse> handleUserConfigIntegrity(UserConfigIntegrityException exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(exception.getMessage()));
    }
}
