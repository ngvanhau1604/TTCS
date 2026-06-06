## HƯỚNG DẪN CHẠY DỰ ÁN SMARTFEE

### ⚡ Quick Start (10 phút)

#### Prerequisites (Chuẩn bị)

- Java 17+ installed
- Maven 3.9+ installed  
- MySQL 8.0+ running locally, OR Docker installed

#### 1. Cấu hình Environment Variables

Create `.env` file in project root:

```env
SPRING_DATASOURCE_USERNAME=smartfee
SPRING_DATASOURCE_PASSWORD=smartfee
JWT_SECRET=0DMjSf5IVIRo4UwCbVDT75RS4hRE0xXfULif093u2iEkKfZc85KLv2vI+aNLi6leOpx/lkPt0G/SAGFQYSboig==
PAYMENT_WEBHOOK_SECRET=test_webhook_secret
```

Reference: Copy from `.env.example` file in the project root.

#### 2. Chuẩn bị Database

**Option A: Using Docker (Recommended)**

```powershell
# Start MySQL via Docker
docker run -d `
  -p 3306:3306 `
  -e MYSQL_ROOT_PASSWORD=root `
  -e MYSQL_DATABASE=smartfee_db `
  -e MYSQL_USER=smartfee `
  -e MYSQL_PASSWORD=smartfee `
  --name smartfee-db `
  mysql:8.0
```

Or use Docker Compose:
```bash
docker-compose up -d db
```

**Option B: Local MySQL Setup**

```powershell
# Windows PowerShell - Automatic setup
cd backend
.\setup-mysql.ps1
```

Or manually:
```sql
CREATE DATABASE smartfee_db;
CREATE USER 'smartfee'@'localhost' IDENTIFIED BY 'smartfee';
GRANT ALL PRIVILEGES ON smartfee_db.* TO 'smartfee'@'localhost';
FLUSH PRIVILEGES;
```

#### 3. Chạy Backend

**Option 1: Using PowerShell Script (Recommended)**

```powershell
cd backend
.\run-backend.ps1
```

**Option 2: Manual Command**

```powershell
cd backend

# Set environment variables
$env:SPRING_DATASOURCE_USERNAME = 'smartfee'
$env:SPRING_DATASOURCE_PASSWORD = 'smartfee'
$env:JWT_SECRET = '0DMjSf5IVIRo4UwCbVDT75RS4hRE0xXfULif093u2iEkKfZc85KLv2vI+aNLi6leOpx/lkPt0G/SAGFQYSboig=='
$env:PAYMENT_WEBHOOK_SECRET = 'test_webhook_secret'

# Run backend
mvn clean spring-boot:run
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
