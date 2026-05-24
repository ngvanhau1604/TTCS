-- Dữ liệu mẫu cho testing

-- Thêm users mẫu (password tạm thời, sẽ được hash khi đăng ký)
INSERT INTO users (username, password, role) VALUES 
('admin', '$2a$10$slYQmyNdGzin7olVN3ou2OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm2', 'ADMIN'),
('resident1', '$2a$10$slYQmyNdGzin7olVN3ou2OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm2', 'RESIDENT'),
('resident2', '$2a$10$slYQmyNdGzin7olVN3ou2OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm2', 'RESIDENT'),
('accountant', '$2a$10$slYQmyNdGzin7olVN3ou2OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm2', 'ACCOUNTANT');

-- Thêm apartments mẫu
INSERT INTO apartments (room_number, area, owner_id) VALUES 
('101', 50.0, 2),
('102', 60.0, 3),
('103', 45.0, 2),
('201', 70.0, 3),
('202', 50.0, 2);

-- Dữ liệu mẫu này có mật khẩu là 'password123' (BCrypt hashed)
-- Dùng để test đăng nhập với username: admin, password: password123
