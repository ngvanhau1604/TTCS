package com.smartfee.controller;

import com.smartfee.dto.LoginRequest;
import com.smartfee.dto.ResidentRegistrationRequest;
import com.smartfee.model.User;
import com.smartfee.service.AuthService;
import com.smartfee.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.smartfee.exception.InvalidDataException;

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

    //     return authService.authenticate(username, password)
    //             .map(user -> {
    //                 String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
    //                 return ResponseEntity.ok(Map.of(
    //                         "token", token,
    //                         "role", user.getRole(),
    //                         "userId", user.getUserId(),
    //                         "username", user.getUsername()));
    //             })
    //             .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
        try {
            return authService.authenticate(username, password)
                    .map(user -> {
                        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
                        return ResponseEntity.ok(Map.of(
                                "token", token,
                                "role", user.getRole(),
                                "userId", user.getUserId(),
                                "username", user.getUsername()));
                    })

                    // Nếu authenticate trả về empty, có thể do sai credentials hoặc do tài khoản đang PENDING/REJECTED, nên trả về 401 cho trường hợp sai credentials
                    .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("error", "Invalid credentials")));  

        } catch (InvalidDataException e) {
            // Bắt lỗi khi tài khoản đang PENDING hoặc REJECTED từ AuthService
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping({ "/register", "/register/resident" })
    public ResponseEntity<?> registerResident(@RequestBody ResidentRegistrationRequest request) {
        try {
            User saved = authService.registerResident(request);
            // Chỉ trả về các thông tin an toàn và cần thiết
            return ResponseEntity.ok(Map.of(
                    "message", "Đăng ký thành công. Vui lòng chờ Ban quản lý xét duyệt.",
                    "username", saved.getUsername(),
                    "status", saved.getApprovalStatus()
            ));
        } catch (InvalidDataException e) {
            // Xử lý lỗi validate (ví dụ: trùng username, sai mã căn hộ...)
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}