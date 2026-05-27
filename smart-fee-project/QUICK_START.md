## HƯỚNG DẪN CHẠY DỰ ÁN SMARTFEE

### ⚡ Quick Start (5 phút)

#### 1. Chuẩn bị Database

```bash
# Mở terminal MySQL
mysql -u root -p

# Copy và chạy commands sau:
CREATE DATABASE smartfee_db;

# Chạy script SQL
SOURCE D:\PTIT\Thực tập cơ sở\Project\smart-fee-project\backend\src\main\resources\db\01_create_schema.sql;
SOURCE D:\PTIT\Thực tập cơ sở\Project\smart-fee-project\backend\src\main\resources\db\02_insert_sample_data.sql;

# Kiểm tra
SELECT * FROM users;
SELECT * FROM apartments;
```

#### 2. Cấu hình ứng dụng

File: `backend\src\main\resources\application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartfee_db?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=<your_mysql_password>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

jwt.secret=supersecretkey
jwt.expiration=86400000

logging.level.org.springframework=INFO
```

#### 3. Chạy ứng dụng

```bash
# Di chuyển vào thư mục backend
cd smart-fee-project\backend

# Cài dependencies
mvn clean install

# Chạy ứng dụng
# Chạy ứng dụng (bắt buộc cung cấp webhook secret cho xử lý callback)
# Ví dụ:
# mvn spring-boot:run -Dpayment.webhook.secret="test_secret"
mvn spring-boot:run -Dpayment.webhook.secret="<your_webhook_secret>"
```

Server sẽ khởi động tại: **http://localhost:8080**

---

### 📝 Test API ngay (Copy & Paste)

#### Đăng nhập (lấy Token)

```bash
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"password123\"}"
```

**Kết quả:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "role": "ADMIN",
  "userId": 1,
  "username": "admin"
}
```

**Lưu token: `YOUR_TOKEN = eyJhbGciOiJIUzUxMiJ9...`**

#### Tính phí tháng 10/2023

```bash
curl -X POST http://localhost:8080/api/invoices/admin/calc-fee ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"month\":10,\"year\":2023}"
```

#### Lấy danh sách hóa đơn

```bash
curl -X GET "http://localhost:8080/api/invoices?status=PENDING" ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Khởi tạo thanh toán

```bash
curl -X POST http://localhost:8080/api/payments ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"invoiceId\":\"1\"}"
```

---

### 🎯 Main Features đã hoàn thành

| Feature | Endpoint | Status |
|---------|----------|--------|
| Đăng nhập | POST /api/auth/login | ✅ |
| Đăng ký | POST /api/auth/register | ✅ |
| Xem hóa đơn | GET /api/invoices | ✅ |
| Tính phí tự động | POST /api/invoices/admin/calc-fee | ✅ |
| Thanh toán | POST /api/payments | ✅ |
| Webhook callback | POST /api/payments/webhook | ✅ |
| Cập nhật trạng thái | PUT /api/invoices/{id} | ✅ |

---

### 🔐 Test Users

```
Username: admin          Password: password123    Role: ADMIN
Username: resident1      Password: password123    Role: RESIDENT
Username: resident2      Password: password123    Role: RESIDENT
Username: accountant     Password: password123    Role: ACCOUNTANT
```

---

### 📚 Tài liệu

- **README.md** - Tổng quan dự án
- **API_TESTING_GUIDE.md** - Chi tiết API + cURL examples
- **IMPLEMENTATION_REPORT.md** - Báo cáo hoàn thành

---

### ⚙️ Cấu hình nâng cao

**Thay đổi JWT Secret:**
```properties
jwt.secret=your_custom_secret_key_here
```

**Thay đổi JWT Expiration (giờ):**
```properties
jwt.expiration=3600000  # 1 giờ
jwt.expiration=86400000 # 24 giờ (mặc định)
```

**Thay đổi Database Host:**
```properties
spring.datasource.url=jdbc:mysql://192.168.1.100:3306/smartfee_db
```

---

### 🐛 Troubleshooting

**Lỗi: "Connection refused" MySQL**
```
Kiểm tra: MySQL service đang chạy không?
Windows: Services → MySQL80 → Start
Linux: sudo service mysql start
```

**Lỗi: "Access denied for user 'root'@'localhost'"**
```
Kiểm tra: Password đúng trong application.properties?
Cố gắng reset: mysql -u root
```

**Lỗi: "port 8080 already in use"**
```
Tìm process: netstat -ano | findstr :8080
Kill process: taskkill /PID <PID> /F
Hoặc đổi port: server.port=8081
```

**Lỗi: "401 Unauthorized"**
```
Kiểm tra: Token hợp lệ?
Kiểm tra: Header: "Authorization: Bearer <token>"
Token hết hạn sau 24 giờ
```

---

### 📊 Kiểm tra Database

```sql
-- Xem số users
SELECT COUNT(*) FROM users;

-- Xem hóa đơn đã tạo
SELECT * FROM invoices LIMIT 10;

-- Xem statistics
SELECT 
    COUNT(*) as total_invoices,
    COUNT(CASE WHEN status='PENDING' THEN 1 END) as pending,
    COUNT(CASE WHEN status='PAID' THEN 1 END) as paid
FROM invoices;
```

---

### 🚀 Build & Deploy

**Tạo JAR File:**
```bash
mvn clean package -DskipTests
# File: target/smart-fee-backend-0.0.1-SNAPSHOT.jar
```

**Chạy JAR File:**
```bash
java -jar target/smart-fee-backend-0.0.1-SNAPSHOT.jar
```

---

### 📞 Hỗ trợ

Nếu có vấn đề:
1. Kiểm tra Java version: `java -version` (cần Java 17+)
2. Kiểm tra MySQL version: `mysql --version` (cần 5.7+)
3. Kiểm tra Maven: `mvn --version` (cần 3.6+)
4. Xem logs: `target/logs` hoặc console output

---

**Status: ✅ READY TO USE**
**Last Updated: May 18, 2024**
