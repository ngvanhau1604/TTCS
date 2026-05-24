package com.smartfee.repository;

import com.smartfee.model.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApartmentRepository extends JpaRepository<Apartment,Integer> {
}