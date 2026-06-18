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

    @PutMapping("/users/{userId}")
    public ResponseEntity<?> updateUserProfileByAdmin(
            @PathVariable Integer userId,
            @RequestBody java.util.Map<String, String> body) {
        String fullName = body.get("fullName");
        String phoneNumber = body.get("phoneNumber");
        String apartmentCode = body.get("apartmentCode");
        try {
            User updated = authService.updateResidentProfileByAdmin(userId, fullName, phoneNumber, apartmentCode);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        }
    }
}