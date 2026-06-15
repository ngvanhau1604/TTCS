package com.smartfee.controller;

import com.smartfee.model.NotificationLog;
import com.smartfee.repository.NotificationLogRepository;
import com.smartfee.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Import HttpStatus để dùng trực tiếp
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map; // Đã bổ sung import java.util.Map để dùng Map.of

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    
    @Autowired
    private NotificationLogRepository notificationLogRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * GET /api/notifications/me
     * Lấy nhật ký thông báo của tài khoản đang đăng nhập hiện tại
     */
    @GetMapping("/me")
    public ResponseEntity<?> getMyNotifications(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .map(user -> ResponseEntity.ok(notificationLogRepository
                        .findByUser_UserIdOrderByCreatedAtDesc(user.getUserId())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * GET /api/notifications/user/{userId}
     * Cư dân chỉ có quyền xem nhật ký thông báo của CHÍNH MÌNH. ADMIN được quyền xem tất cả.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Integer userId, Authentication authentication) {
        // 1. Kiểm tra xem user đăng nhập có quyền ADMIN hay không
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        // 2. Kiểm tra xem người yêu cầu có trùng ID với user muốn xem hay không
        boolean isSelf = userRepository.findByUsername(authentication.getName())
                .map(user -> user.getUserId().equals(userId))
                .orElse(false);

        // Nếu không phải ADMIN và cũng không tự xem của mình -> Từ chối
        if (!isAdmin && !isSelf) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Bạn không có quyền truy cập nhật ký thông báo của cư dân khác."));
        }

        return ResponseEntity.ok(notificationLogRepository.findByUser_UserIdOrderByCreatedAtDesc(userId));
    }
}
