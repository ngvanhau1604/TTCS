package com.smartfee.service;

import com.smartfee.model.Invoice;
import com.smartfee.model.NotificationLog;
import com.smartfee.model.User;
import com.smartfee.repository.InvoiceRepository;
import com.smartfee.repository.NotificationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private NotificationLogRepository notificationLogRepository;

    public NotificationLog log(User user, String title, String message, String channel) {
        NotificationLog notificationLog = new NotificationLog();
        notificationLog.setUser(user);
        notificationLog.setTitle(title);
        notificationLog.setMessage(message);
        notificationLog.setChannel(channel);
        notificationLog.setStatus("SENT");
        return notificationLogRepository.save(notificationLog);
    }

    @Scheduled(cron = "0 0 8 * * *")
    public void sendDebtReminders() {
        List<Invoice> overdueInvoices = invoiceRepository.findByStatus("OVERDUE");
        LocalDate today = LocalDate.now();

        for (Invoice invoice : overdueInvoices) {
            if (invoice.getApartment() == null || invoice.getApartment().getOwner() == null) {
                continue;
            }
            User owner = invoice.getApartment().getOwner();
            String title = "Nhắc nợ hóa đơn";
            String message = "Hóa đơn " + invoice.getInvoiceId() + " đã quá hạn từ ngày " + today + ".";
            log(owner, title, message, "EMAIL");
        }
    }
}