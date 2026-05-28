package com.smartfee.controller;

import com.smartfee.model.User;
import com.smartfee.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/registrations")
public class AdminRegistrationController {

    @Autowired
    private AuthService authService;

    @GetMapping("/pending")
    public ResponseEntity<List<User>> listPending() {
        return ResponseEntity.ok(authService.getPendingResidentRegistrations());
    }

    @PostMapping("/{userId}/approve")
    public ResponseEntity<User> approve(@PathVariable Integer userId) {
        return ResponseEntity.ok(authService.approveResidentRegistration(userId));
    }

    @PostMapping("/{userId}/reject")
    public ResponseEntity<User> reject(@PathVariable Integer userId) {
        return ResponseEntity.ok(authService.rejectResidentRegistration(userId));
    }
}