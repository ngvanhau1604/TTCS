package com.smartfee.repository;

import com.smartfee.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Integer> {
    List<ServiceRequest> findByRequestTypeOrderByCreatedAtDesc(String requestType);

    List<ServiceRequest> findByStatusOrderByCreatedAtDesc(String status);
}