package com.smartfee.service;

import com.smartfee.dto.ServiceRequestRequest;
import com.smartfee.exception.InvalidDataException;
import com.smartfee.exception.ResourceNotFoundException;
import com.smartfee.model.Apartment;
import com.smartfee.model.ServiceRequest;
import com.smartfee.model.User;
import com.smartfee.repository.ApartmentRepository;
import com.smartfee.repository.ServiceRequestRepository;
import com.smartfee.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServiceRequestService {
    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    @Autowired
    private ApartmentRepository apartmentRepository;

    @Autowired
    private UserRepository userRepository;

    public ServiceRequest createRequest(String username, ServiceRequestRequest request) {
        if (request.getRequestType() == null || request.getRequestType().isBlank()) {
            throw new InvalidDataException("requestType là bắt buộc");
        }
        if (request.getTitle() == null || request.getTitle().isBlank()) {
            throw new InvalidDataException("title là bắt buộc");
        }
        if (request.getContent() == null || request.getContent().isBlank()) {
            throw new InvalidDataException("content là bắt buộc");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));

        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setUser(user);
        serviceRequest.setRequestType(request.getRequestType().trim().toUpperCase());
        serviceRequest.setTitle(request.getTitle().trim());
        serviceRequest.setContent(request.getContent().trim());
        serviceRequest.setAttachmentUrl(request.getAttachmentUrl());

        if (request.getApartmentId() != null) {
            Apartment apartment = apartmentRepository.findById(request.getApartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy căn hộ"));
            serviceRequest.setApartment(apartment);
        }

        return serviceRequestRepository.save(serviceRequest);
    }

    public List<ServiceRequest> findAllByStatus(String status) {
        return serviceRequestRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    public ServiceRequest reviewRequest(Integer requestId, String reviewerUsername, String status, String note) {
        ServiceRequest serviceRequest = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy yêu cầu"));

        User reviewer = userRepository.findByUsername(reviewerUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người duyệt"));

        serviceRequest.setStatus(status == null ? "PENDING" : status.trim().toUpperCase());
        serviceRequest.setReviewedBy(reviewer);
        serviceRequest.setReviewedAt(LocalDateTime.now());
        serviceRequest.setResolutionNote(note);

        return serviceRequestRepository.save(serviceRequest);
    }
}