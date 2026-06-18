package com.smartfee.repository;

import com.smartfee.model.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApartmentRepository extends JpaRepository<Apartment, Integer> {
    Optional<Apartment> findByRoomNumber(String roomNumber);
}