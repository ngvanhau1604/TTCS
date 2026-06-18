package com.smartfee.repository;

import com.smartfee.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByInvoice_InvoiceId(Integer invoiceId);

    Optional<Payment> findByTransactionRef(String transactionRef);
}