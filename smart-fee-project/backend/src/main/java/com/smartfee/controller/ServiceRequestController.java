package com.smartfee.controller;

import com.smartfee.dto.ServiceRequestRequest;
import com.smartfee.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {
    @Autowired
    private ServiceRequestService serviceRequestService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ServiceRequestRequest request, Authentication authentication) {
        var saved = serviceRequestService.createRequest(authentication.getName(), request);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "requestId", saved.getRequestId(),
                "status", saved.getStatus(),
                "requestType", saved.getRequestType()));
    }

    @GetMapping
    public ResponseEntity<?> list(@RequestParam(required = false, defaultValue = "PENDING") String status) {
        return ResponseEntity.ok(serviceRequestService.findAllByStatus(status.toUpperCase()));
    }

    @PutMapping("/{requestId}/review")
    public ResponseEntity<?> review(@PathVariable Integer requestId,
            @RequestBody Map<String, String> body,
            Authentication authentication) {
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