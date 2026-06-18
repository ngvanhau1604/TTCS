-- Tạo database
CREATE DATABASE IF NOT EXISTS smartfee_db;
USE smartfee_db;

-- Bảng users
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    full_name VARCHAR(100),
    phone_number VARCHAR(20),
    apartment_code VARCHAR(10),
    approval_status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng apartments
CREATE TABLE IF NOT EXISTS apartments (
    apartment_id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    area DOUBLE,
    occupancy_status VARCHAR(20) DEFAULT 'OCCUPIED',
    motorbike_slots INT DEFAULT 1,
    car_slots INT DEFAULT 0,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng invoices
CREATE TABLE IF NOT EXISTS invoices (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    apartment_id INT NOT NULL,
    billing_month DATE,
    due_date DATE,
    electric_fee DECIMAL(10,2),
    water_fee DECIMAL(10,2),
    management_fee DECIMAL(10,2),
    parking_fee DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (apartment_id) REFERENCES apartments(apartment_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng meter_readings
CREATE TABLE IF NOT EXISTS meter_readings (
    meter_reading_id INT AUTO_INCREMENT PRIMARY KEY,
    apartment_id INT NOT NULL,
    month_year VARCHAR(7) NOT NULL,
    elec_old INT NOT NULL,
    elec_new INT NOT NULL,
    water_old INT NOT NULL,
    water_new INT NOT NULL,
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (apartment_id) REFERENCES apartments(apartment_id) ON DELETE CASCADE,
    UNIQUE KEY uk_meter_reading_month_apartment (apartment_id, month_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng payments
CREATE TABLE IF NOT EXISTS payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    transaction_ref VARCHAR(100) UNIQUE,
    amount DECIMAL(10,2),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    method VARCHAR(30),
    status VARCHAR(20) DEFAULT 'SUCCESS',
    note VARCHAR(255),
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng service_requests
CREATE TABLE IF NOT EXISTS service_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    apartment_id INT,
    request_type VARCHAR(30) NOT NULL,
    title VARCHAR(120) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    attachment_url VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    resolution_note VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (apartment_id) REFERENCES apartments(apartment_id) ON DELETE SET NULL,
    FOREIGN KEY (reviewed_by) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng notification_logs
CREATE TABLE IF NOT EXISTS notification_logs (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(120) NOT NULL,
    message VARCHAR(1000) NOT NULL,
    channel VARCHAR(20) DEFAULT 'EMAIL',
    status VARCHAR(20) DEFAULT 'SENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo indexes để tối ưu query performance
CREATE INDEX idx_invoice_apartment ON invoices(apartment_id);
CREATE INDEX idx_invoice_status ON invoices(status);
CREATE INDEX idx_invoice_billing_month ON invoices(billing_month);
CREATE INDEX idx_apartment_owner ON apartments(owner_id);
CREATE UNIQUE INDEX idx_username ON users(username);
