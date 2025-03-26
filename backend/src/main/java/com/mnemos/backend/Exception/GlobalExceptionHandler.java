package com.mnemos.backend.Exception;

import com.mnemos.backend.Utils.ResponseGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex){
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,  ex.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Map<String, Object>> handleBadRequestException(BadRequestException ex){
        return buildErrorResponse(HttpStatus.BAD_REQUEST,  ex.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFoundException(NotFoundException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST,  ex.getMessage());
    }

    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<Map<String, Object>> handleInternalServerErrorException(InternalServerErrorException ex) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,  ex.getMessage());
    }

    @ExceptionHandler(StatusFoundException.class)
    public ResponseEntity<Map<String, Object>> handleStatusFoundError(StatusFoundException ex) {
        return buildErrorResponse(HttpStatus.FOUND,  ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Map<String, Object>> handleUnauthorizedException(UnauthorizedException ex) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED,  ex.getMessage());
    }

    private ResponseEntity<Map<String, Object>> buildErrorResponse(HttpStatus httpStatus, String message){
        return ResponseEntity.status(httpStatus).body(ResponseGenerator.generateResponse(httpStatus, message, false));
    }
}
