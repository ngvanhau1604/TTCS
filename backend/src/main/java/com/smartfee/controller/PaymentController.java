package com.smartfee.controller;

import com.smartfee.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    /**
     * POST /api/payments
     * Request: { "invoiceId": 123 }
     * Response: { "success": true, "paymentUrl": "..." }
     * 
     * Khởi tạo thanh toán cho một hóa đơn.
     * Server sẽ gọi API gateway thanh toán (VNPay/Momo) và trả URL cho client.
     */
    @PostMapping
    public ResponseEntity<?> initiatePayment(@RequestBody Map<String, String> body) {
        try {
            String invoiceIdStr = body.get("invoiceId");
            String method = body.getOrDefault("method", "VNPAY");
            if (invoiceIdStr == null || invoiceIdStr.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "invoiceId là bắt buộc"));
            }

            Integer invoiceId = Integer.parseInt(invoiceIdStr);
            Map<String, Object> result = paymentService.initiatePayment(invoiceId, method);

            if (Boolean.TRUE.equals(result.get("success"))) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error",
                        result.getOrDefault("error", "Không thể khởi tạo thanh toán. Hóa đơn có thể đã thanh toán.")));
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "invoiceId không hợp lệ"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "error", e.getMessage()));
        }
    }

    /**
     * POST /api/payments/webhook
     * Webhook callback từ payment gateway (VNPay/Momo).
     * Gateway sẽ POST dữ liệu thanh toán đến endpoint này khi thanh toán thành
     * công.
     * 
     * Request:
     * {
     * "invoiceId": "123",
     * "transactionId": "VNP12345",
     * "amount": 1000000,
     * "signature": "abc123..."
     * }
     */
    @PostMapping("/webhook")
    public ResponseEntity<?> handlePaymentWebhook(@RequestBody Map<String, String> body) {
        try {
            String invoiceId = body.get("invoiceId");
            String transactionId = body.get("transactionId");
            String signature = body.get("signature");

            if (invoiceId == null || invoiceId.isBlank() || transactionId == null || transactionId.isBlank()
                    || signature == null || signature.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "invoiceId, transactionId, signature là bắt buộc"));
            }

            boolean result = paymentService.handlePaymentWebhook(invoiceId, transactionId, signature);

            if (result) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Webhook xử lý thành công"));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "Không thể xử lý webhook"));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "error", e.getMessage()));
        }
    }

    /**
     * POST /api/payments/retry
     * Thử lại các thanh toán thất bại.
     * Được gọi từ scheduled task hoặc bằng tay.
     */
    @PostMapping("/retry")
    public ResponseEntity<?> retryFailedPayments() {
        try {
            int pendingCount = paymentService.retryFailedPayments();
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "pendingInvoices", pendingCount,
                    "message", "Đã quét và lên lịch xử lý lại các thanh toán thất bại"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "error", e.getMessage()));
        }
    }

    @GetMapping("/invoice/{invoiceId}")
    public ResponseEntity<?> getByInvoice(@PathVariable Integer invoiceId) {
        return ResponseEntity.ok(paymentService.findPaymentsByInvoice(invoiceId));
    }

}