package com.smartfee.controller;

import com.smartfee.exception.InvalidDataException;
import com.smartfee.exception.ResourceNotFoundException;
import com.smartfee.model.Apartment;
import com.smartfee.repository.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/apartments")
public class ManagementController {
    @Autowired
    private ApartmentRepository apartmentRepository;

    @GetMapping
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(apartmentRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Apartment apartment) {
        if (apartment.getRoomNumber() == null || apartment.getRoomNumber().isBlank()) {
            throw new InvalidDataException("roomNumber là bắt buộc");
        }
        Apartment saved = apartmentRepository.save(apartment);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{apartmentId}")
    public ResponseEntity<?> update(@PathVariable Integer apartmentId, @RequestBody Apartment apartment) {
        Apartment existing = apartmentRepository.findById(apartmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy căn hộ"));
        if (apartment.getRoomNumber() != null) {
            existing.setRoomNumber(apartment.getRoomNumber());
        }
        if (apartment.getArea() != null) {
            existing.setArea(apartment.getArea());
        }
        if (apartment.getOccupancyStatus() != null) {
            existing.setOccupancyStatus(apartment.getOccupancyStatus());
        }
        if (apartment.getMotorbikeSlots() != null) {
            existing.setMotorbikeSlots(apartment.getMotorbikeSlots());
        }
        if (apartment.getCarSlots() != null) {
            existing.setCarSlots(apartment.getCarSlots());
        }
        return ResponseEntity.ok(apartmentRepository.save(existing));
    }

    @GetMapping("/summary")
    public ResponseEntity<?> summary() {
        long total = apartmentRepository.count();
        long occupied = apartmentRepository.findAll().stream()
                .filter(apartment -> "OCCUPIED".equalsIgnoreCase(apartment.getOccupancyStatus()))
                .count();
        return ResponseEntity.ok(Map.of(
                "totalApartments", total,
                "occupiedApartments", occupied,
                "vacantApartments", Math.max(0, total - occupied)));
    }
}