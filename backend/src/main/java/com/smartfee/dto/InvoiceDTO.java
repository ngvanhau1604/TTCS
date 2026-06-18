package com.smartfee.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class InvoiceDTO {
    private Integer invoiceId;
    private Integer apartmentId;
    private String roomNumber;
    private LocalDate billingMonth;
    private BigDecimal totalAmount;
    private String status;

    public InvoiceDTO() {
    }

    public InvoiceDTO(Integer invoiceId, Integer apartmentId, String roomNumber,
            LocalDate billingMonth, BigDecimal totalAmount, String status) {
        this.invoiceId = invoiceId;
        this.apartmentId = apartmentId;
        this.roomNumber = roomNumber;
        this.billingMonth = billingMonth;
        this.totalAmount = totalAmount;
        this.status = status;
    }

    public Integer getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Integer invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Integer getApartmentId() {
        return apartmentId;
    }

    public void setApartmentId(Integer apartmentId) {
        this.apartmentId = apartmentId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public LocalDate getBillingMonth() {
        return billingMonth;
    }

    public void setBillingMonth(LocalDate billingMonth) {
        this.billingMonth = billingMonth;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
