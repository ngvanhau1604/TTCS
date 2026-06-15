package com.smartfee.controller;

import com.smartfee.dto.MeterReadingRequest;
import com.smartfee.service.MeterReadingService;
import com.smartfee.repository.ApartmentRepository; // Import thêm ApartmentRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Import HttpStatus để trả về 403 Forbidden
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/meter-readings")
public class MeterReadingController {

    @Autowired
    private MeterReadingService meterReadingService;

    @Autowired
    private ApartmentRepository apartmentRepository; // Khai báo và Auto-wire thêm repository

    /**
     * POST /api/meter-readings
     * Chỉ ADMIN hoặc STAFF mới được ghi nhận chỉ số điện nước mới (đã phân quyền ở SecurityConfig)
     */
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

    /**
     * GET /api/meter-readings/apartment/{apartmentId}
     * Cư dân chỉ có quyền xem chỉ số điện nước của CHÍNH căn hộ của mình.
     */
    @GetMapping("/apartment/{apartmentId}")
    public ResponseEntity<?> listByApartment(@PathVariable Integer apartmentId, Authentication authentication) {
        // Kiểm tra xem tài khoản đang gọi API có vai trò là cư dân (ROLE_RESIDENT) hay không
        boolean isResident = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_RESIDENT"));

        if (isResident) {
            // Kiểm tra xem căn hộ được yêu cầu có thuộc quyền sở hữu của cư dân đang đăng nhập hay không
            boolean ownsApartment = apartmentRepository.findById(apartmentId)
                    .map(apt -> apt.getOwner() != null && apt.getOwner().getUsername().equals(authentication.getName()))
                    .orElse(false);
            
            if (!ownsApartment) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Bạn không có quyền truy cập dữ liệu chỉ số điện nước của căn hộ khác."));
            }
        }

        return ResponseEntity.ok(meterReadingService.findByApartment(apartmentId));
    }
}
