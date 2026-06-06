# Run Backend Locally

## Prerequisites
- Java 17+ installed
- Maven 3.9+ installed
- MySQL 8.0+ running locally OR Docker installed

## Option 1: Run with Docker Compose (Recommended)

### Start the database service:
```bash
cd ../
docker-compose up -d db
```

Wait 5-10 seconds for MySQL to initialize, then run the backend.

### Run the backend:
```bash
cd backend

# On Windows PowerShell:
$env:SPRING_DATASOURCE_USERNAME='smartfee'
$env:SPRING_DATASOURCE_PASSWORD='smartfee'
$env:JWT_SECRET='0DMjSf5IVIRo4UwCbVDT75RS4hRE0xXfULif093u2iEkKfZc85KLv2vI+aNLi6leOpx/lkPt0G/SAGFQYSboig=='
$env:PAYMENT_WEBHOOK_SECRET='dev_secret_for_testing'
mvn spring-boot:run

# On macOS/Linux:
export SPRING_DATASOURCE_USERNAME=smartfee
export SPRING_DATASOURCE_PASSWORD=smartfee
export JWT_SECRET=0DMjSf5IVIRo4UwCbVDT75RS4hRE0xXfULif093u2iEkKfZc85KLv2vI+aNLi6leOpx/lkPt0G/SAGFQYSboig==
export PAYMENT_WEBHOOK_SECRET=dev_secret_for_testing
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

## Option 2: Run with Local MySQL

### Create MySQL database:
```sql
CREATE DATABASE smartfee_db;
CREATE USER 'smartfee'@'localhost' IDENTIFIED BY 'smartfee';
GRANT ALL PRIVILEGES ON smartfee_db.* TO 'smartfee'@'localhost';
FLUSH PRIVILEGES;
```

### Set environment variables and run:
```bash
# Same as Option 1 above
```

## Troubleshooting

**Error: Access denied for user 'smartfee'@'localhost'**
- Database is not running
- User/password is incorrect
- Make sure MySQL is accessible on `localhost:3306`

**Error: mvn command not found**
- Maven is not installed or not in PATH
- Install Maven from https://maven.apache.org/
- Verify with: `mvn --version`

**JDBC URL error**
- Check `SPRING_DATASOURCE_URL` environment variable
- Default: `jdbc:mysql://localhost:3306/smartfee_db`

## Stop services
```bash
docker-compose down  # Stop and remove containers
docker-compose down -v  # Also remove volumes
```
