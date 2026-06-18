package com.smartfee.repository;

import com.smartfee.model.MeterReading;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MeterReadingRepository extends JpaRepository<MeterReading, Integer> {
    List<MeterReading> findByApartment_ApartmentIdOrderByMonthYearDesc(Integer apartmentId);

    Optional<MeterReading> findByApartment_ApartmentIdAndMonthYear(Integer apartmentId, String monthYear);

    Optional<MeterReading> findFirstByApartment_ApartmentIdAndMonthYearLessThanOrderByMonthYearDesc(Integer apartmentId,
            String monthYear);
}