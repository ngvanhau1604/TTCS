package com.smartfee.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Global Exception Handler theo spec:
 * Định dạng JSON lỗi tiêu chuẩn:
 * {
 * "timestamp": "2023-10-25T10:00:00",
 * "status": 400,
 * "error": "Bad Request",
 * "message": "Chỉ số điện mới không được nhỏ hơn chỉ số cũ."
 * }
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Xử lý lỗi xác thực (401)
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Object> handleAuthenticationException(
            AuthenticationException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Unauthorized", ex.getMessage());
    }

    /**
     * Xử lý lỗi phân quyền (403)
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException(
            AccessDeniedException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, "Access Denied",
                "Bạn không có quyền truy cập tài nguyên này");
    }

    /**
     * Xử lý lỗi validation (400)
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Bad Request", ex.getMessage());
    }

    /**
     * Xử lý lỗi không tìm thấy (404)
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Not Found", ex.getMessage());
    }

    /**
     * Xử lý lỗi dữ liệu không hợp lệ (400)
     */
    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<Object> handleInvalidDataException(
            InvalidDataException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Bad Request", ex.getMessage());
    }

    /**
     * Xử lý tất cả các lỗi khác (500)
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(
            Exception ex, WebRequest request) {
        // Log full stacktrace for debugging purposes so callers receive an error
        logger.error("Unhandled exception caught by GlobalExceptionHandler", ex);
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error",
                "Lỗi server: " + ex.getMessage());
    }

    /**
     * Hàm helper để tạo response error theo format chuẩn
     */
    private ResponseEntity<Object> buildErrorResponse(HttpStatus status, String error, String message) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", error);
        body.put("message", message);

        return new ResponseEntity<>(body, status);
    }
}
