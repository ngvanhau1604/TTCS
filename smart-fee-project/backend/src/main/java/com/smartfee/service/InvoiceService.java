package com.smartfee.service;

import com.smartfee.model.Apartment;
import com.smartfee.model.Invoice;
import com.smartfee.model.MeterReading;
import com.smartfee.exception.InvalidDataException;
import com.smartfee.repository.ApartmentRepository;
import com.smartfee.repository.InvoiceRepository;
import com.smartfee.repository.MeterReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;
import java.util.List;
import java.util.LinkedHashMap;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ApartmentRepository apartmentRepository;

    @Autowired
    private MeterReadingRepository meterReadingRepository;

    // Cấu hình giá dịch vụ (có thể đưa vào database sau)
    private static final BigDecimal MANAGEMENT_PRICE_PER_M2 = BigDecimal.valueOf(50000); // VND
    private static final BigDecimal WATER_PRICE = BigDecimal.valueOf(7000); // VND per m3
    private static final BigDecimal PARKING_MOTORBIKE_FEE = BigDecimal.valueOf(100000); // VND
    private static final BigDecimal PARKING_CAR_FEE = BigDecimal.valueOf(800000); // VND

    public List<Invoice> getAll() {
        return invoiceRepository.findAll();
    }

    public List<Invoice> getAllByApartment(Integer apartmentId) {
        return invoiceRepository.findByApartment_ApartmentId(apartmentId);
    }

    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> findByApartment(Integer apartmentId) {
        return invoiceRepository.findByApartment_ApartmentId(apartmentId);
    }

    public List<Invoice> findByStatus(String status) {
        return invoiceRepository.findByStatus(status);
    }

    public List<Invoice> findByMonth(LocalDate month) {
        return invoiceRepository.findByBillingMonth(LocalDate.of(month.getYear(), month.getMonthValue(), 1));
    }

    public boolean markPaid(Integer invoiceId) {
        return invoiceRepository.findById(invoiceId).map(inv -> {
            inv.markAsPaid();
            invoiceRepository.save(inv);
            return true;
        }).orElse(false);
    }

    public java.util.Optional<Invoice> getInvoiceById(Integer invoiceId) {
        return invoiceRepository.findById(invoiceId);
    }

    public java.util.Optional<Invoice> updateInvoice(Integer invoiceId, Invoice updatedInvoice) {
        return invoiceRepository.findById(invoiceId).map(invoice -> {
            if (updatedInvoice.getTotalAmount() != null) {
                invoice.setTotalAmount(updatedInvoice.getTotalAmount());
            }
            if (updatedInvoice.getStatus() != null) {
                invoice.setStatus(updatedInvoice.getStatus());
            }
            if (updatedInvoice.getBillingMonth() != null) {
                invoice.setBillingMonth(updatedInvoice.getBillingMonth());
            }
            if (updatedInvoice.getDueDate() != null) {
                invoice.setDueDate(updatedInvoice.getDueDate());
            }
            if (updatedInvoice.getElectricFee() != null) {
                invoice.setElectricFee(updatedInvoice.getElectricFee());
            }
            if (updatedInvoice.getWaterFee() != null) {
                invoice.setWaterFee(updatedInvoice.getWaterFee());
            }
            if (updatedInvoice.getManagementFee() != null) {
                invoice.setManagementFee(updatedInvoice.getManagementFee());
            }
            if (updatedInvoice.getParkingFee() != null) {
                invoice.setParkingFee(updatedInvoice.getParkingFee());
            }
            return invoiceRepository.save(invoice);
        });
    }

    public Map<String, Object> getInvoiceStats(Integer month, Integer year) {
        List<Invoice> invoices = invoiceRepository.findAll();

        if (month != null && year != null) {
            invoices = invoices.stream()
                    .filter(inv -> inv.getBillingMonth() != null
                            && inv.getBillingMonth().getMonthValue() == month
                            && inv.getBillingMonth().getYear() == year)
                    .toList();
        }

        long pending = invoices.stream().filter(inv -> "PENDING".equalsIgnoreCase(inv.getStatus())
                || "UNPAID".equalsIgnoreCase(inv.getStatus())).count();
        long paid = invoices.stream().filter(inv -> "PAID".equalsIgnoreCase(inv.getStatus())).count();
        long overdue = invoices.stream().filter(inv -> "OVERDUE".equalsIgnoreCase(inv.getStatus())).count();
        long draft = invoices.stream().filter(inv -> "DRAFT".equalsIgnoreCase(inv.getStatus())).count();

        BigDecimal totalAmount = invoices.stream()
                .map(Invoice::getTotalAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("totalInvoices", invoices.size());
        response.put("pending", pending);
        response.put("draft", draft);
        response.put("paid", paid);
        response.put("overdue", overdue);
        response.put("totalAmount", totalAmount);
        response.put("month", month);
        response.put("year", year);
        return response;
    }

    public int markOverdueInvoices() {
        LocalDate currentMonthStart = LocalDate.now().withDayOfMonth(1);
        List<Invoice> pending = invoiceRepository.findByStatus("PENDING");
        int updated = 0;

        for (Invoice invoice : pending) {
            if (invoice.getBillingMonth() != null && invoice.getBillingMonth().isBefore(currentMonthStart)) {
                invoice.setStatus("OVERDUE");
                invoiceRepository.save(invoice);
                updated++;
            }
        }

        return updated;
    }

    /**
     * Tính phí tự động theo thuật toán trong spec:
     * 1. Phí quản lý = Diện tích * Giá tiêu chuẩn
     * 2. Tiền nước = Chỉ số sử dụng * Giá nước
     * 3. Phí gửi xe = Giá cơ bản
     * Tổng = Phí quản lý + Tiền nước + Phí gửi xe
     */
    public int generateMonthlyInvoices(int month, int year) {
        if (month < 1 || month > 12) {
            throw new InvalidDataException("Tháng không hợp lệ");
        }
        if (year < 2000 || year > 2100) {
            throw new InvalidDataException("Năm không hợp lệ");
        }

        LocalDate billingMonth = LocalDate.of(year, month, 1);
        int createdCount = 0;

        // Lấy tất cả các căn hộ
        List<Apartment> apartments = apartmentRepository.findAll();

        for (Apartment apt : apartments) {
            // Kiểm tra nếu đã tạo hóa đơn cho tháng này
            if (invoiceRepository.existsByApartment_ApartmentIdAndBillingMonth(
                    apt.getApartmentId(), billingMonth)) {
                continue;
            }

            // 1. Tính phí quản lý
            BigDecimal managementFee = BigDecimal.valueOf(apt.getArea() != null ? apt.getArea() : 0)
                    .multiply(MANAGEMENT_PRICE_PER_M2);

            String monthYear = monthYearKey(month, year);
            MeterReading reading = meterReadingRepository
                    .findByApartment_ApartmentIdAndMonthYear(apt.getApartmentId(), monthYear).orElse(null);

            int electricUsage = reading != null ? reading.getElectricUsage() : 0;
            int waterUsage = reading != null ? reading.getWaterUsage() : 0;

            BigDecimal electricFee = calculateTieredElectricFee(electricUsage);
            BigDecimal waterFee = calculateWaterFee(waterUsage);

            // 3. Tính phí gửi xe
            int motorbikeSlots = apt.getMotorbikeSlots() == null ? 0 : apt.getMotorbikeSlots();
            int carSlots = apt.getCarSlots() == null ? 0 : apt.getCarSlots();
            BigDecimal parkingFee = PARKING_MOTORBIKE_FEE.multiply(BigDecimal.valueOf(motorbikeSlots))
                    .add(PARKING_CAR_FEE.multiply(BigDecimal.valueOf(carSlots)));

            // 4. Tổng hợp
            BigDecimal totalAmount = managementFee.add(electricFee).add(waterFee).add(parkingFee);

            // Tạo hóa đơn mới
            Invoice invoice = new Invoice();
            invoice.setApartment(apt);
            invoice.setBillingMonth(billingMonth);
            invoice.setDueDate(billingMonth.withDayOfMonth(Math.min(15, billingMonth.lengthOfMonth())));
            invoice.setElectricFee(electricFee);
            invoice.setWaterFee(waterFee);
            invoice.setManagementFee(managementFee);
            invoice.setParkingFee(parkingFee);
            invoice.setTotalAmount(totalAmount);
            invoice.setStatus("PENDING");

            invoiceRepository.save(invoice);
            createdCount++;
        }

        return createdCount;
    }

    public BigDecimal calculateTieredElectricFee(int usage) {
        if (usage <= 0) {
            return BigDecimal.ZERO;
        }

        int[] limits = { 50, 50, 100, 100, 100, Integer.MAX_VALUE };
        BigDecimal[] prices = {
                BigDecimal.valueOf(1806),
                BigDecimal.valueOf(1866),
                BigDecimal.valueOf(2167),
                BigDecimal.valueOf(2729),
                BigDecimal.valueOf(3050),
                BigDecimal.valueOf(3151)
        };

        int remaining = usage;
        BigDecimal total = BigDecimal.ZERO;
        for (int index = 0; index < limits.length && remaining > 0; index++) {
            int tierUsage = Math.min(remaining, limits[index]);
            total = total.add(BigDecimal.valueOf(tierUsage).multiply(prices[index]));
            remaining -= tierUsage;
        }
        return total;
    }

    public BigDecimal calculateWaterFee(int usage) {
        if (usage <= 0) {
            return BigDecimal.ZERO;
        }
        return BigDecimal.valueOf(usage).multiply(WATER_PRICE);
    }

    public String monthYearKey(int month, int year) {
        return String.format("%04d-%02d", year, month);
    }
}