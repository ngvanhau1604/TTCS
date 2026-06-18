package com.smartfee.service;

import com.smartfee.dto.MeterReadingRequest;
import com.smartfee.exception.InvalidDataException;
import com.smartfee.exception.ResourceNotFoundException;
import com.smartfee.model.Apartment;
import com.smartfee.model.MeterReading;
import com.smartfee.repository.ApartmentRepository;
import com.smartfee.repository.MeterReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeterReadingService {
    @Autowired
    private MeterReadingRepository meterReadingRepository;

    @Autowired
    private ApartmentRepository apartmentRepository;

    public MeterReading saveReading(MeterReadingRequest request) {
        if (request.getApartmentId() == null) {
            throw new InvalidDataException("apartmentId là bắt buộc");
        }
        if (request.getMonthYear() == null || request.getMonthYear().isBlank()) {
            throw new InvalidDataException("monthYear là bắt buộc");
        }

        Apartment apartment = apartmentRepository.findById(request.getApartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy căn hộ"));

        if (request.getElecNew() == null || request.getElecOld() == null || request.getWaterNew() == null
                || request.getWaterOld() == null) {
            throw new InvalidDataException("Chỉ số điện/nước là bắt buộc");
        }

        if (request.getElecNew() < request.getElecOld() || request.getWaterNew() < request.getWaterOld()) {
            throw new InvalidDataException("Chỉ số mới phải lớn hơn hoặc bằng chỉ số cũ");
        }

        MeterReading reading = meterReadingRepository
                .findByApartment_ApartmentIdAndMonthYear(apartment.getApartmentId(), request.getMonthYear())
                .orElseGet(MeterReading::new);

        reading.setApartment(apartment);
        reading.setMonthYear(request.getMonthYear());
        reading.setElecOld(request.getElecOld());
        reading.setElecNew(request.getElecNew());
        reading.setWaterOld(request.getWaterOld());
        reading.setWaterNew(request.getWaterNew());
        reading.setCreatedBy(request.getCreatedBy());

        return meterReadingRepository.save(reading);
    }

    public List<MeterReading> findByApartment(Integer apartmentId) {
        return meterReadingRepository.findByApartment_ApartmentIdOrderByMonthYearDesc(apartmentId);
    }
}