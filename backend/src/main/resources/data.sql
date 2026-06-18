-- Dữ liệu mẫu cho testing

-- Thêm users mẫu (password tạm thời, sẽ được hash khi đăng ký)
INSERT INTO users (username, password, role, approval_status, apartment_code) VALUES
('admin', '$2a$10$kk3iQsSTDh9sVAy2yxZx7.MBOUAcSJyw7/g6dRZo4ja3yvEHocDyS', 'ADMIN', 'APPROVED', NULL),
('resident1', '$2a$10$kk3iQsSTDh9sVAy2yxZx7.MBOUAcSJyw7/g6dRZo4ja3yvEHocDyS', 'RESIDENT', 'APPROVED', '101'),
('resident2', '$2a$10$kk3iQsSTDh9sVAy2yxZx7.MBOUAcSJyw7/g6dRZo4ja3yvEHocDyS', 'RESIDENT', 'APPROVED', '102'),
('resident_pending', '$2a$10$kk3iQsSTDh9sVAy2yxZx7.MBOUAcSJyw7/g6dRZo4ja3yvEHocDyS', 'RESIDENT', 'PENDING', '1604'),
('accountant', '$2a$10$kk3iQsSTDh9sVAy2yxZx7.MBOUAcSJyw7/g6dRZo4ja3yvEHocDyS', 'ACCOUNTANT', 'APPROVED', NULL);

-- Thêm apartments mẫu
INSERT INTO apartments (room_number, area, owner_id) VALUES 
('101', 50.0, 2),
('102', 60.0, 3),
('103', 45.0, 2),
('201', 70.0, 3),
('202', 50.0, 2),
('1604', 55.0, NULL);

-- Dữ liệu mẫu này có mật khẩu là 'password123' (BCrypt hashed)
-- Dùng để test đăng nhập với username: admin, password: password123
