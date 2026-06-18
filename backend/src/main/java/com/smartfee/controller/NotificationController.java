package com.smartfee.controller;

import com.smartfee.model.NotificationLog;
import com.smartfee.model.User;
import com.smartfee.repository.NotificationLogRepository;
import com.smartfee.repository.UserRepository;
import com.smartfee.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    
    @Autowired
    private NotificationLogRepository notificationLogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    /**
     * GET /api/notifications
     * ADMIN được xem toàn bộ danh sách thông báo đã gửi
     */
    @GetMapping
    public ResponseEntity<?> getAllNotifications(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Bạn không có quyền truy cập danh sách thông báo chung."));
        }

        return ResponseEntity.ok(notificationLogRepository.findAllByOrderByCreatedAtDesc());
    }

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

    /**
     * POST /api/notifications
     * Ban quản lý tạo thông báo gửi tới 1 cư dân hoặc phát cho toàn bộ cư dân
     */
    @PostMapping
    public ResponseEntity<?> createNotification(@RequestBody Map<String, String> body, Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Chỉ Ban quản lý mới được phép đăng thông báo."));
        }

        String title = body.get("title");
        String message = body.get("message");
        String targetUsername = body.get("username");

        if (title == null || title.isBlank() || message == null || message.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "title và message là bắt buộc"));
        }

        if (targetUsername != null && !targetUsername.isBlank()) {
            var userOpt = userRepository.findByUsername(targetUsername.trim());
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy cư dân"));
            }
            User user = userOpt.get();
            NotificationLog saved = notificationService.log(user, title.trim(), message.trim(), "SYSTEM");
            return ResponseEntity.ok(saved);
        } else {
            List<User> residents = userRepository.findAll().stream()
                    .filter(u -> "RESIDENT".equalsIgnoreCase(u.getRole()))
                    .toList();
            for (User resident : residents) {
                notificationService.log(resident, title.trim(), message.trim(), "BROADCAST");
            }
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "count", residents.size(),
                    "message", "Đã gửi thông báo tới tất cả cư dân thành công."
            ));
        }
    }
}
