package com.smartfee.repository;

import com.smartfee.model.NotificationLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationLogRepository extends JpaRepository<NotificationLog, Integer> {
    List<NotificationLog> findByUser_UserIdOrderByCreatedAtDesc(Integer userId);
}