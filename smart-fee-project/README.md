# SmartFee - Hệ thống Quản lý Tài chính Căn hộ

## Giới thiệu
SmartFee là hệ thống quản lý tài chính căn hộ tích hợp, cho phép:
- Quản lý hóa đơn dịch vụ căn hộ
- Tính phí tự động hàng tháng
- Xử lý thanh toán trực tuyến
- Quản lý người dùng và phân quyền

## Công nghệ

### Backend
- **Framework**: Spring Boot 3.1.0
- **Java**: Java 17
- **Database**: MySQL 8.0+
- **Authentication**: JWT (Stateless)
- **Security**: Spring Security + BCrypt

### Frontend
- **Web**: ReactJS + Tailwind CSS
- **Phạm vi**: Web-only, responsive, mobile-first cho cư dân
- **Trạng thái**: Đã khởi tạo frontend tại `frontend/`

## Cấu trúc Dự án

```
smart-fee-project/
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/main/java/com/smartfee/
│   │   ├── config/           # Spring Security configuration
│   │   ├── controller/       # REST API endpoints
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── exception/        # Custom exceptions & global handler
│   │   ├── model/            # JPA entities
│   │   ├── repository/       # Data access layer
│   │   ├── service/          # Business logic
│   │   ├── util/             # JWT utilities, filters
│   │   └── SmartFeeApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/               # SQL scripts
│   └── pom.xml
```

## Yêu cầu Hệ thống

- Java 17+
- MySQL 8.0+
- Maven 3.6+
- Node.js 18+ (cho frontend React/Tailwind)

## Cài đặt & Chạy

### 1. Chuẩn bị Database

```bash
# Đăng nhập MySQL
mysql -u root -p

# Tạo database
CREATE DATABASE smartfee_db;

# Chạy các script SQL
SOURCE src/main/resources/db/01_create_schema.sql
SOURCE src/main/resources/db/02_insert_sample_data.sql
```

### 2. Cấu hình ứng dụng

Chỉnh sửa `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartfee_db?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

jwt.secret=your_secret_key_here
jwt.expiration=86400000

logging.level.org.springframework=INFO
```

### 3. Chạy ứng dụng

```bash
# Sử dụng Maven
mvn clean install
mvn spring-boot:run -Dpayment.webhook.secret="<your_webhook_secret>"

# Hoặc chạy trực tiếp từ JAR
java -Dpayment.webhook.secret="<your_webhook_secret>" -jar target/smart-fee-project-1.0.0.jar
```

Server sẽ chạy trên `http://localhost:8080`

> Note: The backend requires a payment webhook secret for processing payment gateway callbacks in strict mode. Set `-Dpayment.webhook.secret` when running the service (or provide via environment/secret manager). Webhook verification uses HMAC-SHA256(secret, transactionRef) and the service enforces idempotency for duplicate transactionRef.

## API Endpoints

### Authentication

**POST /api/auth/login**
```json
Request:
{
  "username": "admin",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "role": "ADMIN",
  "userId": 1,
  "username": "admin"
}
```

**POST /api/auth/register**
```json
Request:
{
  "username": "newuser",
  "password": "password123",
  "fullName": "Nguyen Van A",
  "phoneNumber": "0909123456",
  "apartmentCode": "101"
}

Response: User object
```

Tài khoản đăng ký mới của cư dân sẽ ở trạng thái chờ duyệt. Admin phải xác nhận thì tài khoản mới được phép đăng nhập.

### Invoices

**GET /api/invoices?month=10&status=PENDING**
- Lấy danh sách hóa đơn
- Query params:
  - `month`: Tháng (1-12)
  - `year`: Năm
  - `status`: PENDING hoặc PAID
  - `apartmentId`: ID căn hộ

**GET /api/invoices/{invoiceId}**
- Lấy chi tiết một hóa đơn

**POST /api/invoices**
- Tạo hóa đơn mới (dùng cho test)

**PUT /api/invoices/{invoiceId}**
- Cập nhật hóa đơn

**POST /api/invoices/admin/calc-fee**
```json
Request:
{
  "month": 10,
  "year": 2023
}

Response:
{
  "totalCalculated": 5,
  "success": true,
  "message": "Tính phí thành công cho 5 căn hộ"
}
```

**POST /api/invoices/{invoiceId}/mark-paid**
- Đánh dấu hóa đơn là đã thanh toán (test)

### Payments

**POST /api/payments**
```json
Request:
{
  "invoiceId": "123"
}

Response:
{
  "success": true,
  "paymentUrl": "https://sandbox.vnpayment.vn/paygate/...",
  "message": "Yêu cầu thanh toán được gửi đến gateway"
}
```

**POST /api/payments/webhook**
- Webhook callback từ payment gateway (VNPay/Momo)

**POST /api/payments/retry**
- Thử lại các thanh toán thất bại

## Xác thực & Phân quyền

Tất cả API (ngoại trừ `/api/auth/**`) cần JWT token trong header:

```
Authorization: Bearer <token>
```

### Roles
- **ADMIN**: Quản lý toàn bộ hệ thống, tạo tài khoản, xem tất cả dữ liệu, cấu hình và vận hành các chức năng quản trị.
- **RESIDENT**: Cư dân, chỉ xem dữ liệu của chính mình, tra cứu hóa đơn, thanh toán, gửi yêu cầu hỗ trợ/khiếu nại.
- **ACCOUNTANT**: Kế toán, quản lý và đối soát hóa đơn, gạch nợ, theo dõi trạng thái thanh toán và báo cáo tài chính.
- **STAFF**: Nhân viên BQL, nhập chỉ số, xử lý yêu cầu nội bộ, hỗ trợ vận hành và cập nhật dữ liệu căn hộ.

> Mỗi tài khoản chỉ có một role duy nhất. Các tài khoản ADMIN, ACCOUNTANT và STAFF được tạo sẵn hoặc do admin cấp. Người dùng tự đăng ký chỉ tạo yêu cầu cư dân và phải chờ admin duyệt.

## Định dạng Response Lỗi

```json
{
  "timestamp": "2023-10-25T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Dữ liệu không hợp lệ"
}
```

### HTTP Status Codes
- **200**: Success
- **400**: Bad Request
- **401**: Unauthorized (Token không hợp lệ)
- **403**: Forbidden (Không có quyền)
- **404**: Not Found
- **500**: Internal Server Error

## Tính Phí Tự động

Hệ thống sử dụng thuật toán tính phí sau:

```
Phí Quản lý = Diện tích căn hộ × 50,000 VND/m²
Tiền Nước = Chỉ số sử dụng × 5,000 VND/m³
Phí Gửi xe = 100,000 VND

Tổng = Phí Quản lý + Tiền Nước + Phí Gửi xe
```

Gọi API để tính phí tự động hàng tháng:
```
POST /api/invoices/admin/calc-fee
Body: { "month": 10, "year": 2023 }
```

## Testing

### Dữ liệu mẫu

User mẫu trong database:
- **Username**: admin, **Password**: password123, **Role**: ADMIN
- **Username**: resident1, **Password**: password123, **Role**: RESIDENT
- **Username**: accountant, **Password**: password123, **Role**: ACCOUNTANT

Các căn hộ mẫu:
- Căn 101 (50m²), 102 (60m²), 103 (45m²), 201 (70m²), 202 (50m²)

### Test API với cURL

```bash
# Đăng nhập
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Lấy danh sách hóa đơn (với token)
curl -X GET "http://localhost:8080/api/invoices?status=PENDING" \
  -H "Authorization: Bearer <token>"

# Tính phí tháng 10/2023
curl -X POST http://localhost:8080/api/invoices/admin/calc-fee \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"month":10,"year":2023}'
```

## Deployment

### Tạo file JAR
```bash
mvn clean package -DskipTests
```

### Chạy trên server
```bash
java -jar smart-fee-project-1.0.0.jar \
  --spring.datasource.url=jdbc:mysql://db-server:3306/smartfee_db \
  --spring.datasource.username=app_user \
  --spring.datasource.password=secure_password \
  --jwt.secret=your_secret_key
```

## Bảo mật

- ✅ JWT Authentication (Stateless)
- ✅ BCrypt Password Hashing
- ✅ Role-Based Authorization
- ✅ HTTPS (trong production)
- ✅ Input Validation
- ✅ SQL Injection Prevention (JPA)

## Tương lai

- [ ] Frontend ReactJS
- [ ] Mobile App (React Native)
- [ ] Payment Gateway Integration (VNPay/Momo)
- [ ] Email Notifications
- [ ] SMS Reminders
- [ ] Analytics Dashboard
- [ ] Audit Logging
- [ ] Docker Containerization

## Docker & Docker Compose

Hướng dẫn chạy ứng dụng bằng Docker (backend + frontend + MySQL) dùng `docker compose`.

1) Tạo file `.env` trong thư mục gốc (`smart-fee-project`) với nội dung tối thiểu:

```
PAYMENT_WEBHOOK_SECRET=replace_with_strong_secret_here
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_DATABASE=smartfee_db
MYSQL_USER=smartfee
MYSQL_PASSWORD=smartfee
```

2) Build và up toàn bộ stack:

```powershell
# Windows PowerShell
# (từ thư mục smart-fee-project)
$env:PAYMENT_WEBHOOK_SECRET='your_strong_secret_here'
docker compose up --build
```

3) Gõ `http://localhost:3000` để mở frontend; backend API có sẵn tại `http://localhost:8080/api`.

Ghi chú bảo mật:
- `PAYMENT_WEBHOOK_SECRET` là bắt buộc (strict mode). Docker entrypoint sẽ từ chối khởi động nếu biến này không được thiết lập.
- Trên môi trường production, lưu `PAYMENT_WEBHOOK_SECRET` và các bí mật DB trong secret manager (GitHub Secrets, Azure Key Vault, etc.) thay vì trong `.env` plaintext.

Mẹo dev nhanh:
- Chỉ muốn khởi backend (không dùng Docker): build bằng Maven và chạy:

```powershell
mvn -DskipTests package
java -Dpayment.webhook.secret="your_secret" -jar backend/target/*smart-fee-backend*.jar
```

CI integration:
- Bạn có thể thêm bước để build Docker images trong CI và push vào registry (DockerHub/GitHub Container Registry). Trong workflow CI, không lưu secret vào repo; dùng repository secrets.

## Hỗ trợ

Nếu có vấn đề, vui lòng liên hệ team phát triển.

## License

Copyright 2023 SmartFee Team
