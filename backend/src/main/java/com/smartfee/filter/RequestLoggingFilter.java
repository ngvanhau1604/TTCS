package com.smartfee.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestLoggingFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        ContentCachingRequestWrapper wrapped = new ContentCachingRequestWrapper(httpRequest, 1024 * 50);
        try {
            chain.doFilter(wrapped, response);
        } finally {
            String path = httpRequest.getRequestURI();
            if (path != null && path.contains("/api/auth/login")) {
                String contentType = httpRequest.getContentType();
                if (contentType != null && contentType.contains("application/json")) {
                    byte[] buf = wrapped.getContentAsByteArray();
                    if (buf != null && buf.length > 0) {
                        String payload;
                        try {
                            payload = new String(buf, httpRequest.getCharacterEncoding() == null ? "UTF-8"
                                    : httpRequest.getCharacterEncoding());
                        } catch (Exception e) {
                            payload = "[unreadable]";
                        }
                        logger.debug("[RequestLoggingFilter] Raw request body for {}: {}", path, payload);
                    } else {
                        logger.debug("[RequestLoggingFilter] No cached request body for {}", path);
                    }
                } else {
                    logger.debug("[RequestLoggingFilter] Content-Type {} for {} - not logging body", contentType, path);
                }
            }
        }
    }
}
