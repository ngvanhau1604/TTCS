package com.smartfee.repository;

import com.smartfee.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    List<Invoice> findByApartment_ApartmentId(Integer apartmentId);

    List<Invoice> findByStatus(String status);

    boolean existsByApartment_ApartmentIdAndBillingMonth(Integer apartmentId, LocalDate billingMonth);

    List<Invoice> findByBillingMonth(LocalDate month);
}