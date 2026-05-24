package com.smartfee.controller;

import com.smartfee.dto.MeterReadingRequest;
import com.smartfee.service.MeterReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/meter-readings")
public class MeterReadingController {
    @Autowired
    private MeterReadingService meterReadingService;

    @PostMapping
    public ResponseEntity<?> createOrUpdate(@RequestBody MeterReadingRequest request, Authentication authentication) {
        if (request.getCreatedBy() == null || request.getCreatedBy().isBlank()) {
            request.setCreatedBy(authentication != null ? authentication.getName() : "system");
        }
        var saved = meterReadingService.saveReading(request);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "meterReadingId", saved.getMeterReadingId(),
                "monthYear", saved.getMonthYear(),
                "electricUsage", saved.getElectricUsage(),
                "waterUsage", saved.getWaterUsage()));
    }

    @GetMapping("/apartment/{apartmentId}")
    public ResponseEntity<?> listByApartment(@PathVariable Integer apartmentId) {
        return ResponseEntity.ok(meterReadingService.findByApartment(apartmentId));
    }
}