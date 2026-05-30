package com.smartfee.controller;

import com.smartfee.model.Invoice;
import com.smartfee.dto.CalcFeeRequest;
import com.smartfee.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;
import com.smartfee.repository.ApartmentRepository;
import com.smartfee.model.Apartment;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private ApartmentRepository apartmentRepository;

    private static final Set<String> VALID_STATUSES = Set.of("DRAFT", "PENDING", "PAID", "OVERDUE", "UNPAID");

    /**
     * GET /api/invoices?month=10&status=UNPAID
     * Lấy danh sách hóa đơn theo tháng và trạng thái.
     */
    @GetMapping
    public ResponseEntity<?> getAllInvoices(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer apartmentId) {

        if (month != null && (month < 1 || month > 12)) {
            return ResponseEntity.badRequest().body(Map.of("error", "month phải nằm trong khoảng 1-12"));
        }
        if (month != null && year == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "year là bắt buộc khi truyền month"));
        }

        final String normalizedStatus;
        if (status != null && !status.isBlank()) {
            String tmpStatus = status.trim().toUpperCase();
            if (!VALID_STATUSES.contains(tmpStatus)) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "status chỉ hỗ trợ: DRAFT, PENDING, UNPAID, PAID, OVERDUE"));
            }
            if ("UNPAID".equals(tmpStatus)) {
                tmpStatus = "PENDING";
            }
            normalizedStatus = tmpStatus;
        } else {
            normalizedStatus = null;
        }

        List<Invoice> invoices;

        // Nếu có apartmentId, lấy hóa đơn của căn hộ đó
        if (apartmentId != null) {
            invoices = invoiceService.findByApartment(apartmentId);
        } else {
            invoices = invoiceService.getAll();
        }

        // Lọc theo tháng/năm nếu có
        if (month != null && year != null) {
            invoices = invoices.stream()
                    .filter(inv -> inv.getBillingMonth() != null &&
                            inv.getBillingMonth().getYear() == year &&
                            inv.getBillingMonth().getMonthValue() == month)
                    .collect(Collectors.toList());
        }

        // Lọc theo trạng thái nếu có
        if (normalizedStatus != null) {
            invoices = invoices.stream()
                    .filter(inv -> normalizedStatus.equalsIgnoreCase(inv.getStatus()))
                    .collect(Collectors.toList());
        }

        return ResponseEntity.ok(invoices);
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getInvoiceStats(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year) {
        if (month != null && (month < 1 || month > 12)) {
            return ResponseEntity.badRequest().body(Map.of("error", "month phải nằm trong khoảng 1-12"));
        }
        if (month != null && year == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "year là bắt buộc khi truyền month"));
        }

        return ResponseEntity.ok(invoiceService.getInvoiceStats(month, year));
    }

    /**
     * GET /api/invoices/{invoiceId}
     * Lấy chi tiết một hóa đơn.
     */
    @GetMapping("/{invoiceId}")
    public ResponseEntity<?> getInvoice(@PathVariable Integer invoiceId) {
        return invoiceService.getInvoiceById(invoiceId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/invoices
     * Tạo hóa đơn mới (dùng để test, không thường dùng trong production).
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Invoice invoice) {
        try {
            Invoice saved = invoiceService.createInvoice(invoice);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * PUT /api/invoices/{invoiceId}
     * Cập nhật hóa đơn.
     */
    @PutMapping("/{invoiceId}")
    public ResponseEntity<?> update(@PathVariable Integer invoiceId, @RequestBody Invoice invoice) {
        return invoiceService.updateInvoice(invoiceId, invoice)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/admin/calc-fee
     * Request: { "month": 10, "year": 2023 }
     * Response: { "totalCalculated": 150, "success": true }
     * 
     * Tính phí tự động cho tất cả căn hộ trong tháng.
     */
    @PostMapping("/admin/calc-fee")
    public ResponseEntity<?> calculateFees(@RequestBody CalcFeeRequest body) {
        try {
            if (body.getMonth() == null || body.getYear() == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "error", "month và year là bắt buộc",
                        "success", false));
            }

            int month = body.getMonth();
            int year = body.getYear();

            if (month < 1 || month > 12) {
                return ResponseEntity.badRequest().body(
                        Map.of("error", "Tháng không hợp lệ", "success", false));
            }
            if (year < 2000 || year > 2100) {
                return ResponseEntity.badRequest().body(
                        Map.of("error", "Năm không hợp lệ", "success", false));
            }

            int createdCount = invoiceService.generateMonthlyInvoices(month, year);

            // Compute skipped (duplicates) as total apartments - created
            int totalApartments = 0;
            try {
                List<Apartment> all = apartmentRepository.findAll();
                totalApartments = all == null ? 0 : all.size();
            } catch (Exception ignore) {
                totalApartments = 0;
            }

            int skipped = Math.max(0, totalApartments - createdCount);

            Map<String, Object> resp = new LinkedHashMap<>();
            resp.put("totalCalculated", createdCount);
            resp.put("skipped", skipped);
            resp.put("success", true);
            String msg = "Tính phí thành công cho " + createdCount + " căn hộ";
            if (skipped > 0) {
                msg += ". Đã phát hiện " + skipped + " căn hộ đã có hóa đơn, bỏ qua.";
                resp.put("warning", "Đã phát hiện bản ghi trùng, xem logs để biết chi tiết");
            }
            resp.put("message", msg);

            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", e.getMessage(),
                    "success", false));
        }
    }

    /**
     * POST /api/invoices/{invoiceId}/mark-paid
     * Đánh dấu hóa đơn là đã thanh toán (dùng cho test).
     */
    @PostMapping("/{invoiceId}/mark-paid")
    public ResponseEntity<?> markPaid(@PathVariable Integer invoiceId) {
        boolean marked = invoiceService.markPaid(invoiceId);
        if (!marked) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Map.of("success", true, "message", "Đã đánh dấu thanh toán"));
    }

    @PostMapping("/admin/mark-overdue")
    public ResponseEntity<?> markOverdueInvoices() {
        int updated = invoiceService.markOverdueInvoices();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "updated", updated,
                "message", "Đã cập nhật trạng thái OVERDUE cho " + updated + " hóa đơn"));
    }

    @GetMapping("/apartment/{apartmentId}")
    public ResponseEntity<?> getInvoicesByApartment(@PathVariable Integer apartmentId) {
        return ResponseEntity.ok(invoiceService.getAllByApartment(apartmentId));
    }
}