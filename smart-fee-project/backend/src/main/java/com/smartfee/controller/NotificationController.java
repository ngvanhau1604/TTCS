package com.smartfee.controller;

import com.smartfee.model.NotificationLog;
import com.smartfee.repository.NotificationLogRepository;
import com.smartfee.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationLogRepository notificationLogRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getMyNotifications(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .map(user -> ResponseEntity.ok(notificationLogRepository
                        .findByUser_UserIdOrderByCreatedAtDesc(user.getUserId())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(notificationLogRepository.findByUser_UserIdOrderByCreatedAtDesc(userId));
    }
}