package com.smartfee.service;

import com.smartfee.model.Invoice;
import com.smartfee.model.Payment;
import com.smartfee.repository.InvoiceRepository;
import com.smartfee.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Optional;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private InvoiceService invoiceService;

    /**
     * Xử lý thanh toán cho một hóa đơn.
     * Trong hệ thống thực tế, phương thức này sẽ gọi API gateway thanh toán
     * (VNPay/Momo)
     * và trả về URL thanh toán cho client.
     */
    public boolean processPayment(Integer invoiceId) {
        return Boolean.TRUE.equals(initiatePayment(invoiceId, "VNPAY").get("success"));
    }

    public Map<String, Object> initiatePayment(Integer invoiceId, String method) {
        Map<String, Object> response = new LinkedHashMap<>();
        if (invoiceId == null || invoiceId <= 0) {
            response.put("success", false);
            response.put("error", "invoiceId không hợp lệ");
            return response;
        }

        Optional<Invoice> invoiceOpt = invoiceRepository.findById(invoiceId);
        if (invoiceOpt.isEmpty()) {
            response.put("success", false);
            response.put("error", "Không tìm thấy hóa đơn");
            return response;
        }

        Invoice invoice = invoiceOpt.get();

        // Kiểm tra nếu đã thanh toán rồi
        if ("PAID".equals(invoice.getStatus())) {
            response.put("success", false);
            response.put("error", "Hóa đơn đã được thanh toán");
            return response;
        }

        String normalizedMethod = method == null || method.isBlank() ? "VNPAY" : method.trim().toUpperCase();
        String transactionRef = "SF-" + invoiceId + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String paymentUrl = "https://sandbox.vnpayment.vn/paygate/?ref=" + transactionRef + "&amount="
                + invoice.getTotalAmount();

        response.put("success", true);
        response.put("invoiceId", invoiceId);
        response.put("transactionRef", transactionRef);
        response.put("method", normalizedMethod);
        response.put("amount", invoice.getTotalAmount());
        response.put("paymentUrl", paymentUrl);
        response.put("message", "Yêu cầu thanh toán đã được khởi tạo");
        return response;
    }

    /**
     * Xử lý webhook từ gateway thanh toán (VNPay/Momo).
     * Webhook này được gọi khi thanh toán thành công.
     * Cần xác minh chữ ký (Signature) để chắc chắn request từ gateway hợp lệ.
     */
    public boolean handlePaymentWebhook(String invoiceId, String transactionId, String signature) {
        logger.debug("handlePaymentWebhook called: invoiceId={}, transactionId={}, signature={}", invoiceId,
                transactionId, signature);

        if (invoiceId == null || invoiceId.isBlank() || transactionId == null || transactionId.isBlank()) {
            logger.warn("Invalid webhook payload: missing invoiceId or transactionId");
            return false;
        }

        if (signature == null || signature.isBlank()) {
            logger.warn("Invalid webhook payload: missing signature for transaction {}", transactionId);
            return false;
        }

        boolean ok = verifySignature(transactionId, signature);
        if (!ok) {
            logger.warn("Signature verification failed for transaction {}. Provided signature: {}", transactionId,
                    signature);
            return false;
        }

        // 1. Xác minh chữ ký webhook (checksum verification)
        // if (!verifySignature(webhookData, signature)) {
        // return false;
        // }

        // 2. Cập nhật trạng thái hóa đơn thành PAID
        Integer parsedInvoiceId;
        try {
            parsedInvoiceId = Integer.parseInt(invoiceId);
        } catch (NumberFormatException ex) {
            return false;
        }

        Optional<Invoice> invoiceOpt = invoiceRepository.findById(parsedInvoiceId);
        if (invoiceOpt.isEmpty()) {
            return false;
        }

        Invoice invoice = invoiceOpt.get();
        if ("PAID".equalsIgnoreCase(invoice.getStatus())) {
            return true;
        }
        invoice.setStatus("PAID");
        invoiceRepository.save(invoice);

        Payment payment = new Payment();
        payment.setInvoice(invoice);
        payment.setTransactionRef(transactionId);
        payment.setAmount(invoice.getTotalAmount() == null ? BigDecimal.ZERO : invoice.getTotalAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setMethod("VNPAY");
        payment.setStatus("SUCCESS");
        payment.setNote("Webhook đã xác thực thành công");
        paymentRepository.save(payment);

        // 3. Có thể ghi log transaction_id để lưu vết
        // TODO: Lưu vào database

        return true;
    }

    /**
     * Xác minh chữ ký webhook từ payment gateway.
     * Mỗi gateway (VNPay, Momo) có cách xác minh khác nhau.
     */
    private boolean verifySignature(String data, String signature) {
        // Use HMAC-SHA256 verification against a configured secret.
        try {
            // Strict mode: require explicit system property `-Dpayment.webhook.secret`.
            String secret = System.getProperty("payment.webhook.secret");
            if (secret == null || secret.isBlank()) {
                logger.warn("payment.webhook.secret system property is not set; rejecting webhook (strict mode)");
                return false;
            }

            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
            javax.crypto.spec.SecretKeySpec keySpec = new javax.crypto.spec.SecretKeySpec(
                    secret.getBytes(java.nio.charset.StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(keySpec);
            byte[] rawHmac = mac.doFinal(data.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            String expected = java.util.Base64.getEncoder().encodeToString(rawHmac);
            logger.debug("verifySignature: data={}, expectedSignaturePresent={}, providedSignaturePresent={}", data,
                    expected != null, signature != null);
            return expected.equals(signature);
        } catch (Exception ex) {
            logger.error("Exception while verifying signature", ex);
            return false;
        }
    }

    /**
     * Thử lại thanh toán thất bại (retry mechanism).
     * Có thể được gọi từ scheduled task để xử lý thanh toán bị mất kết nối.
     */
    public int retryFailedPayments() {
        List<Invoice> pendingInvoices = invoiceRepository.findByStatus("PENDING");
        // Demo retry: hiện tại chỉ trả số lượng bản ghi cần retry.
        return pendingInvoices.size();
    }

    public List<Payment> findPaymentsByInvoice(Integer invoiceId) {
        return paymentRepository.findByInvoice_InvoiceId(invoiceId);
    }
}