package com.smartfee.controller;

import com.smartfee.dto.ServiceRequestRequest;
import com.smartfee.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Đã bổ sung import HttpStatus
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService serviceRequestService;

    /**
     * POST /api/service-requests
     * Cư dân tạo phản ánh/yêu cầu mới
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody ServiceRequestRequest request, Authentication authentication) {
        var saved = serviceRequestService.createRequest(authentication.getName(), request);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "requestId", saved.getRequestId(),
                "status", saved.getStatus(),
                "requestType", saved.getRequestType()));
    }

    /**
     * GET /api/service-requests
     * Cư dân chỉ xem được phản ánh của bản thân. ADMIN/STAFF được xem toàn bộ.
     */
    @GetMapping
    public ResponseEntity<?> list(
            @RequestParam(required = false, defaultValue = "PENDING") String status,
            Authentication authentication) {
        
        boolean isResident = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_RESIDENT"));

        // Nếu là cư dân, chỉ lấy những phản ánh do chính tài khoản này tạo ra
        if (isResident) {
            return ResponseEntity.ok(serviceRequestService.findAllByStatusAndUsername(status.toUpperCase(), authentication.getName()));
        }

        // Nếu là ADMIN/STAFF, lấy toàn bộ danh sách phản ánh
        return ResponseEntity.ok(serviceRequestService.findAllByStatus(status.toUpperCase()));
    }

    /**
     * PUT /api/service-requests/{requestId}/review
     * Chỉ ADMIN hoặc STAFF mới được duyệt/phản hồi yêu cầu phản ánh
     */
    @PutMapping("/{requestId}/review")
    public ResponseEntity<?> review(@PathVariable Integer requestId,
            @RequestBody Map<String, String> body,
            Authentication authentication) {
        
        boolean hasPrivilege = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_STAFF"));
        
        if (!hasPrivilege) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Bạn không có quyền phê duyệt phản ánh này."));
        }

        var reviewed = serviceRequestService.reviewRequest(requestId,
                authentication.getName(),
                body.getOrDefault("status", "APPROVED"),
                body.getOrDefault("note", ""));
        return ResponseEntity.ok(Map.of(
                "success", true,
                "requestId", reviewed.getRequestId(),
                "status", reviewed.getStatus(),
                "resolutionNote", reviewed.getResolutionNote()));
    }
}
