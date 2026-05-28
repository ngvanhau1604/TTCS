## API Testing Guide - SmartFee

Hướng dẫn chi tiết để test các API endpoints của SmartFee.

### Setup

1. **Khởi động Server**
```bash
cd smart-fee-project/backend
mvn clean install
# Run with payment webhook secret (required for callback verification):
# mvn spring-boot:run -Dpayment.webhook.secret="test_secret"
mvn spring-boot:run -Dpayment.webhook.secret="<your_webhook_secret>"
```
Server sẽ chạy ở: `http://localhost:8080`

2. **Chuẩn bị Database**
```bash
# Chạy script SQL
mysql -u root -p < src/main/resources/db/01_create_schema.sql
mysql -u root -p < src/main/resources/db/02_insert_sample_data.sql
```

3. **Tools cần thiết**
- cURL hoặc Postman
- MySQL client

---

## 1. Authentication Tests

### 1.1 Login thành công

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY5NzAwMDAwMCwiZXhwIjoxNjk3MDg2NDAwfQ.xyz",
  "role": "ADMIN",
  "userId": 1,
  "username": "admin"
}
```

**Lưu token để dùng cho các request sau**

---

## 2. Invoice Management Tests

### 2.1 Lấy tất cả hóa đơn

```bash
curl -X GET http://localhost:8080/api/invoices \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2.2 Lấy hóa đơn theo tháng

```bash
curl -X GET "http://localhost:8080/api/invoices?month=10&year=2023" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2.3 Lấy hóa đơn theo trạng thái

```bash
curl -X GET "http://localhost:8080/api/invoices?status=PENDING" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2.4 Lấy hóa đơn của một căn hộ

```bash
curl -X GET "http://localhost:8080/api/invoices?apartmentId=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2.5 Lấy chi tiết một hóa đơn

```bash
curl -X GET http://localhost:8080/api/invoices/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2.6 Tính phí tự động

```bash
curl -X POST http://localhost:8080/api/invoices/admin/calc-fee \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "month": 10,
    "year": 2023
  }'
```

**Response:**
```json
{
  "totalCalculated": 5,
  "success": true,
  "message": "Tính phí thành công cho 5 căn hộ"
}
```

### 2.7 Cập nhật hóa đơn

```bash
curl -X PUT http://localhost:8080/api/invoices/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "totalAmount": 500000.00,
    "status": "PAID"
  }'
```

### 2.8 Đánh dấu hóa đơn đã thanh toán

```bash
curl -X POST http://localhost:8080/api/invoices/1/mark-paid \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 3. Payment Tests

### 3.1 Khởi tạo thanh toán

```bash
curl -X POST http://localhost:8080/api/payments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "invoiceId": "1"
  }'
```

**Response:**
```json
{
  "success": true,
  "paymentUrl": "https://sandbox.vnpayment.vn/paygate/...",
  "message": "Yêu cầu thanh toán được gửi đến gateway"
}
```

### 3.2 Webhook callback (mô phỏng)

```bash
curl -X POST http://localhost:8080/api/payments/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "invoiceId": "1",
    "transactionId": "VNP20231025123456",
    "signature": "<computed_base64_hmac>"
  }'
```

Note: The backend requires a pre-shared webhook secret. To compute the HMAC-SHA256 signature in bash:

```bash
TX="VNP20231025123456"
SECRET="test_secret"
SIGNATURE=$(printf "%s" "$TX" | openssl dgst -sha256 -hmac "$SECRET" -binary | openssl base64)
echo $SIGNATURE
```

Use the printed base64 value as `signature` in the webhook payload.

### 3.3 Thử lại thanh toán

```bash
curl -X POST http://localhost:8080/api/payments/retry \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 4. Error Handling Tests

### 4.1 Test 401 - Unauthorized (token sai)

```bash
curl -X GET http://localhost:8080/api/invoices \
  -H "Authorization: Bearer invalid_token"
```

**Response:**
```json
{
  "timestamp": "2023-10-25T10:30:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid token"
}
```

### 4.2 Test 404 - Not Found

```bash
curl -X GET http://localhost:8080/api/invoices/999999 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4.3 Test 400 - Bad Request

```bash
curl -X POST http://localhost:8080/api/invoices/admin/calc-fee \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "month": 13,
    "year": 2023
  }'
```

---

## 5. Integration Flow Test

**Flow: Tạo hóa đơn → Thanh toán → Cập nhật trạng thái**

```bash
# 1. Đăng nhập
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}' | jq -r '.token')

# 2. Tính phí tháng 10/2023
curl -X POST http://localhost:8080/api/invoices/admin/calc-fee \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"month":10,"year":2023}'

# 3. Lấy danh sách hóa đơn PENDING
curl -X GET "http://localhost:8080/api/invoices?status=PENDING" \
  -H "Authorization: Bearer $TOKEN"

# 4. Khởi tạo thanh toán cho hóa đơn đầu tiên
curl -X POST http://localhost:8080/api/payments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"invoiceId":"1"}'

# 5. Giả lập webhook thành công
curl -X POST http://localhost:8080/api/payments/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "invoiceId": "1",
    "transactionId": "VNP_TEST_001",
    "signature": "test_sig"
  }'

# 6. Kiểm tra lại hóa đơn (status should be PAID)
curl -X GET http://localhost:8080/api/invoices/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## 6. Performance Testing

### Load Test (tính phí cho nhiều căn hộ)

```bash
# Tính phí từ tháng 1-12 năm 2023
for month in {1..12}; do
  curl -s -X POST http://localhost:8080/api/invoices/admin/calc-fee \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"month\":$month,\"year\":2023}" | jq '.'
done
```

---

## 7. Database Verification

```sql
-- Kiểm tra invoices đã tạo
SELECT COUNT(*) as total_invoices,
       COUNT(CASE WHEN status = 'PENDING' THEN 1 END) as pending,
       COUNT(CASE WHEN status = 'PAID' THEN 1 END) as paid
FROM invoices;

-- Kiểm tra invoices theo tháng
SELECT DATE_FORMAT(billing_month, '%Y-%m') as month,
       COUNT(*) as count
FROM invoices
GROUP BY DATE_FORMAT(billing_month, '%Y-%m');

-- Kiểm tra user permissions
SELECT username, role FROM users;
```

---

## Notes

- **Token Expiration**: 24 giờ (86400000ms)
- **Default Password**: `password123` (BCrypt hashed)
- **Sample Data**: 5 căn hộ, 4 users
- **Phí Tính toán**:
  - Phí quản lý = Diện tích × 50,000 VND/m²
  - Tiền nước = 5,000 VND
  - Phí gửi xe = 100,000 VND

---

## Postman Collection

Tạo file `SmartFee.postman_collection.json` để import vào Postman:

```json
{
  "info": {
    "name": "SmartFee API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": {
              "raw": "http://localhost:8080/api/auth/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8080",
              "path": ["api", "auth", "login"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\"username\":\"admin\",\"password\":\"password123\"}"
            }
          }
        }
      ]
    }
  ]
}
```
