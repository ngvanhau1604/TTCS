package com.smartfee.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password; // hashed

    @Column(nullable = false, updatable = false, length = 20)
    private String role; // assigned once at registration, then immutable

    @Column(length = 100)
    private String fullName;

    @Column(length = 20)
    private String phoneNumber;

    @Column(length = 10)
    private String apartmentCode;

    @Column(nullable = false, length = 20)
    private String approvalStatus;

    @PrePersist
    protected void normalizeRole() {
        if (role == null || role.isBlank()) {
            role = "RESIDENT";
        } else {
            role = role.trim().toUpperCase();
        }

        if (approvalStatus == null || approvalStatus.isBlank()) {
            approvalStatus = "RESIDENT".equals(role) ? "PENDING" : "APPROVED";
        } else {
            approvalStatus = approvalStatus.trim().toUpperCase();
        }
    }

    // getters/setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getApartmentCode() {
        return apartmentCode;
    }

    public void setApartmentCode(String apartmentCode) {
        this.apartmentCode = apartmentCode;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }
}