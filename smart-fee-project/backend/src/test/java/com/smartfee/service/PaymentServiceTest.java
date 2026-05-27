package com.smartfee.service;

import com.smartfee.model.Invoice;
import com.smartfee.repository.InvoiceRepository;
import com.smartfee.repository.PaymentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PaymentServiceTest {

    @Mock
    InvoiceRepository invoiceRepository;

    @Mock
    PaymentRepository paymentRepository;

    @InjectMocks
    PaymentService paymentService;

    private String computeHmacBase64(String secret, String data) throws Exception {
        javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
        javax.crypto.spec.SecretKeySpec keySpec = new javax.crypto.spec.SecretKeySpec(
                secret.getBytes(java.nio.charset.StandardCharsets.UTF_8), "HmacSHA256");
        mac.init(keySpec);
        byte[] raw = mac.doFinal(data.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        return java.util.Base64.getEncoder().encodeToString(raw);
    }

    @Test
    public void handlePaymentWebhook_withCorrectSecret_marksInvoicePaid() throws Exception {
        System.setProperty("payment.webhook.secret", "test_secret");

        String tx = "SF-1-TEST";
        String sig = computeHmacBase64("test_secret", tx);

        Invoice inv = new Invoice();
        inv.setInvoiceId(1);
        inv.setStatus("PENDING");
        inv.setTotalAmount(new BigDecimal("123000"));

        when(invoiceRepository.findById(1)).thenReturn(Optional.of(inv));

        boolean ok = paymentService.handlePaymentWebhook("1", tx, sig);
        assertTrue(ok);

        ArgumentCaptor<Invoice> captor = ArgumentCaptor.forClass(Invoice.class);
        verify(invoiceRepository, times(1)).save(captor.capture());
        assertEquals("PAID", captor.getValue().getStatus());
        verify(paymentRepository, times(1)).save(any());
    }

    @Test
    public void handlePaymentWebhook_missingSecret_rejected() throws Exception {
        System.clearProperty("payment.webhook.secret");
        String tx = "SF-2-TEST";
        // compute signature locally but service should reject because secret missing
        String sig = computeHmacBase64("test_secret", tx);

        Invoice inv = new Invoice();
        inv.setInvoiceId(2);
        inv.setStatus("PENDING");
        inv.setTotalAmount(new BigDecimal("50000"));

        // Do NOT stub invoiceRepository here; service should reject earlier when secret
        // missing
        boolean ok = paymentService.handlePaymentWebhook("2", tx, sig);
        assertFalse(ok);
        verify(invoiceRepository, never()).save(any());
        verify(paymentRepository, never()).save(any());
    }
}
