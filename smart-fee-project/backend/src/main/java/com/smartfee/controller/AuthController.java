package com.smartfee.controller;

import com.smartfee.dto.LoginRequest;
import com.smartfee.dto.ResidentRegistrationRequest;
import com.smartfee.model.User;
import com.smartfee.service.AuthService;
import com.smartfee.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getUsername() == null || request.getUsername().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "username và password là bắt buộc"));
        }

        String username = request.getUsername().trim();
        String password = request.getPassword();
        return authService.authenticate(username, password)
                .map(user -> {
                    String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
                    return ResponseEntity.ok(Map.of(
                            "token", token,
                            "role", user.getRole(),
                            "userId", user.getUserId(),
                            "username", user.getUsername()));
                })
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }

    @PostMapping({ "/register", "/register/resident" })
    public ResponseEntity<User> registerResident(@RequestBody ResidentRegistrationRequest request) {
        User saved = authService.registerResident(request);
        return ResponseEntity.ok(saved);
    }
}