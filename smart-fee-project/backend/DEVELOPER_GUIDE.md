# Smart Fee Backend - Developer Guide

## Overview

The Smart Fee backend is a Spring Boot 4.0 application that manages apartment fee calculations, payments, and user management using:

- **Java 17+** with Spring Boot 4.0
- **Spring Data JPA** with Hibernate ORM
- **MySQL 8.0** database
- **JWT** authentication with HS512 signatures
- **REST API** with Swagger documentation

## Prerequisites

### System Requirements

- Java 17 or higher (check with `java -version`)
- Maven 3.9+ (check with `mvn --version`)
- MySQL 8.0+ running locally OR Docker installed

### Software Installation

**Java:**
- Download: https://www.oracle.com/java/technologies/downloads/#java17
- Or use OpenJDK: `choco install openjdk` (Windows) or `brew install openjdk@17` (Mac)

**Maven:**
- Download: https://maven.apache.org/download.cgi
- Add to PATH so `mvn` command works globally

**MySQL (if not using Docker):**
- Download: https://dev.mysql.com/downloads/mysql/
- Or: `choco install mysql` (Windows) or `brew install mysql` (Mac)

## Quick Start

### 1. Setup Environment Variables

Copy `.env.example` to `.env` in the project root:

```powershell
# Windows
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `.env` with your configuration (default values are provided for development).

### 2. Start the Database

**Option A: Docker (Recommended)**

```bash
docker run -d \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=smartfee_db \
  -e MYSQL_USER=smartfee \
  -e MYSQL_PASSWORD=smartfee \
  --name smartfee-db \
  mysql:8.0
```

Or with docker-compose:

```bash
cd ..
docker-compose up -d db
```

**Option B: Local MySQL**

```sql
-- Open MySQL client and run:
CREATE DATABASE smartfee_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'smartfee'@'localhost' IDENTIFIED BY 'smartfee';
GRANT ALL PRIVILEGES ON smartfee_db.* TO 'smartfee'@'localhost';
FLUSH PRIVILEGES;
```

Or run the setup script (Windows):

```powershell
.\setup-mysql.ps1
```

### 3. Start the Backend

**Option A: Using Startup Script (Recommended)**

```powershell
# Windows PowerShell
.\run-backend.ps1

# Or batch file
run-backend.bat
```

**Option B: Manual Command**

```powershell
# Set environment variables
$env:SPRING_DATASOURCE_USERNAME='smartfee'
$env:SPRING_DATASOURCE_PASSWORD='smartfee'
$env:JWT_SECRET='0DMjSf5IVIRo4UwCbVDT75RS4hRE0xXfULif093u2iEkKfZc85KLv2vI+aNLi6leOpx/lkPt0G/SAGFQYSboig=='
$env:PAYMENT_WEBHOOK_SECRET='test_webhook_secret'

# Run
mvn clean spring-boot:run
```

The backend will start at: **http://localhost:8080**

## Troubleshooting

### Error: "Access denied for user 'smartfee'@'localhost'"

**Cause:** MySQL database is not running or credentials are incorrect

**Solutions:**
1. Verify MySQL is running: `mysql -u root -p -e "SELECT VERSION();"`
2. Check credentials in `.env` file match your MySQL setup
3. Use Docker: `docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_USER=smartfee -e MYSQL_PASSWORD=smartfee mysql:8.0`

### Error: "mvn: command not found"

**Cause:** Maven is not installed or not in PATH

**Solutions:**
1. Install Maven: https://maven.apache.org/download.cgi
2. Add Maven's `bin` directory to your system PATH
3. Verify: `mvn --version`

### Error: "JDBC URL error" or "Cannot connect to database"

**Cause:** JDBC URL is incorrect or MySQL is on different host/port

**Solution:** Check `SPRING_DATASOURCE_URL` in `.env`:
- Local: `jdbc:mysql://localhost:3306/smartfee_db`
- Docker: `jdbc:mysql://db:3306/smartfee_db` (inside docker-compose network)
- Remote: `jdbc:mysql://192.168.x.x:3306/smartfee_db`

### Error: "Port 8080 already in use"

**Cause:** Another application is using port 8080

**Solutions:**
1. Stop the other application
2. Change port with: `$env:SERVER_PORT='8081'` before running

### Error: "JWT secret is required" or authentication fails

**Cause:** `JWT_SECRET` environment variable is not set

**Solution:** Make sure `.env` file exists and `JWT_SECRET` is configured:

```env
JWT_SECRET=0DMjSf5IVIRo4UwCbVDT75RS4hRE0xXfULif093u2iEkKfZc85KLv2vI+aNLi6leOpx/lkPt0G/SAGFQYSboig==
```

## Building and Testing

### Build Only (Skip Tests)

```bash
mvn clean package -DskipTests
```

Output: `target/smart-fee-backend-0.0.1-SNAPSHOT.jar`

### Build and Run Tests

```bash
mvn clean package
```

### Run a Specific Test

```bash
mvn test -Dtest=AuthControllerTest
```

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/smartfee/
│   │   │   ├── config/           # Spring configuration
│   │   │   ├── controller/       # REST API endpoints
│   │   │   ├── service/          # Business logic
│   │   │   ├── repository/       # Database access
│   │   │   ├── model/            # JPA entities
│   │   │   ├── dto/              # Data transfer objects
│   │   │   ├── exception/        # Custom exceptions
│   │   │   ├── util/             # Utilities (JWT, validation, etc.)
│   │   │   └── SmartFeeApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── db/               # SQL schema and data files
│   │       └── static/           # Static files
│   └── test/
│       └── java/com/smartfee/
└── pom.xml                       # Maven dependencies

```

## Key Configuration Files

### application.properties

- Database URL, username, password (via environment variables)
- JPA/Hibernate settings
- JWT configuration
- Logging levels

### pom.xml

- Spring Boot version: 4.0.6
- Java version: 17
- Key dependencies:
  - Spring Data JPA
  - Spring Security
  - MySQL Connector/J
  - JWT (jjwt)
  - Hibernate

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/register` - Register new user
- `POST /api/auth/refresh` - Refresh expired token

### Admin Features

- `POST /api/invoices/admin/calc-fee` - Calculate monthly fees
- `PUT /api/invoices/{id}/confirm` - Confirm invoice
- `GET /api/residents` - List all residents
- `POST /api/residents` - Create resident

### Resident Features

- `GET /api/invoices/me` - Get my invoices
- `POST /api/payments` - Create payment

### Webhooks

- `POST /api/webhooks/payment` - Payment gateway callback

## Development Tips

### Debug Mode

Add `--debug` flag to enable debug logging:

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--debug"
```

### Hot Reload

Use Spring Boot DevTools for automatic restart on file changes:

```bash
# Already included in pom.xml, just add --jvmArgs
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-DskipTests"
```

### View Generated SQL

Add to `.env` or application.properties:

```properties
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

### Test with cURL

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"password123\"}"

# Use token in subsequent requests
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/invoices
```

## Database Schema

### Key Tables

- `users` - User accounts with roles (ADMIN, RESIDENT)
- `apartments` - Apartment information
- `invoices` - Monthly billing records
- `payments` - Payment history
- `transactions` - Transaction logs

See `src/main/resources/db/` for full schema and sample data.

## Security Notes

- JWT tokens expire after 24 hours (configurable)
- Passwords are hashed with bcrypt
- Webhook signatures use HMAC-SHA256
- All secrets must be configured via environment variables (never hard-coded)
- `.env` file is gitignored to prevent credential exposure

## Common Commands

```bash
# Clean build
mvn clean

# Compile only
mvn compile

# Run tests
mvn test

# Build and package
mvn package

# Deploy
mvn install

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# Stop running server
# Press Ctrl+C in the terminal

# View dependency tree
mvn dependency:tree

# Update dependencies
mvn versions:display-dependency-updates
```

## Performance Tips

- The application uses connection pooling (HikariCP) by default
- Database queries are optimized with JPA/Hibernate
- JWT validation is cached to reduce CPU usage
- Consider adding caching (Redis) for high-traffic scenarios

## Deployment

For production deployment, see [IMPLEMENTATION_REPORT.md](../IMPLEMENTATION_REPORT.md)

---

**Need Help?**

- Check the [API Testing Guide](./API_TESTING_GUIDE.md)
- See [Troubleshooting](#troubleshooting) section above
- Review log output carefully for error messages
- Use `mvn help` for Maven documentation
