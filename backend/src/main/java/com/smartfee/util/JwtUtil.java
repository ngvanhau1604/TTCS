package com.smartfee.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
    @Value("${jwt.secret:secretkey123}")
    private String secret;

    @Value("${jwt.expiration:86400000}")
    private long expiration;

    public String generateToken(String username, String role) {
        byte[] keyBytes = getSecretKeyBytes(secret);
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(Keys.hmacShaKeyFor(keyBytes), SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims parseToken(String token) {
        byte[] keyBytes = getSecretKeyBytes(secret);
        return Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(keyBytes))
                .parseClaimsJws(token)
                .getBody();
    }

    private byte[] getSecretKeyBytes(String secret) {
        if (secret == null) {
            logger.warn("JWT secret is not set; using default insecure secret");
            return "secretkey123".getBytes(java.nio.charset.StandardCharsets.UTF_8);
        }
        // If the secret looks like Base64 (contains '=' padding or non-alphanumeric),
        // try to decode
        try {
            if (secret.contains("=") || secret.contains("/") || secret.contains("+")) {
                return java.util.Base64.getDecoder().decode(secret);
            }
        } catch (IllegalArgumentException e) {
            logger.debug("Provided jwt.secret is not valid Base64, using raw bytes");
        }
        return secret.getBytes(java.nio.charset.StandardCharsets.UTF_8);
    }
}