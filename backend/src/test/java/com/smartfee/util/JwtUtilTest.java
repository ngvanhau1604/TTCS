package com.smartfee.util;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTest {

    @Test
    public void generateAndParseToken_roundtrip() {
        JwtUtil util = new JwtUtil();
        // set secret via reflection
        // provide a Base64-encoded 512-bit secret to satisfy HS512 key size
        // requirements
        byte[] key = io.jsonwebtoken.security.Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS512).getEncoded();
        String b64 = java.util.Base64.getEncoder().encodeToString(key);
        ReflectionTestUtils.setField(util, "secret", b64);
        ReflectionTestUtils.setField(util, "expiration", 3600000L);

        String token = util.generateToken("alice", "ROLE_USER");
        assertNotNull(token);

        Claims claims = util.parseToken(token);
        assertEquals("alice", claims.getSubject());
        assertEquals("ROLE_USER", claims.get("role"));
    }
}
