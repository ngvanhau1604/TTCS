# Setup Local MySQL Database for Smart Fee
# This script creates the required MySQL database and user for local development

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Smart Fee - MySQL Setup" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL client is available
try {
    $mysqlVersion = mysql --version 2>$null
    Write-Host "✓ MySQL client found: $mysqlVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: MySQL client not found in PATH" -ForegroundColor Red
    Write-Host "Please install MySQL: https://dev.mysql.com/downloads/mysql/" -ForegroundColor Yellow
    Write-Host "Or use Docker: docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=smartfee_db -e MYSQL_USER=smartfee -e MYSQL_PASSWORD=smartfee mysql:8.0" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "This script will create:" -ForegroundColor Cyan
Write-Host "  - Database: smartfee_db"
Write-Host "  - User: smartfee"
Write-Host "  - Password: smartfee"
Write-Host ""

$rootPassword = Read-Host "Enter MySQL root password"
if ([string]::IsNullOrEmpty($rootPassword)) {
    $rootPassword = "root"
    Write-Host "Using default root password: root" -ForegroundColor Yellow
}

# Create SQL setup script
$sqlScript = @"
-- Create database
CREATE DATABASE IF NOT EXISTS smartfee_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER IF NOT EXISTS 'smartfee'@'localhost' IDENTIFIED BY 'smartfee';

-- Grant privileges
GRANT ALL PRIVILEGES ON smartfee_db.* TO 'smartfee'@'localhost';
FLUSH PRIVILEGES;

-- Verify
SELECT 'Database and user created successfully!' as 'Result';
"@

Write-Host ""
Write-Host "Running setup SQL..." -ForegroundColor Cyan

# Execute SQL
$sqlScript | mysql -u root -p$rootPassword 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ MySQL setup completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run the backend with:" -ForegroundColor Cyan
    Write-Host "  .\run-backend.ps1" -ForegroundColor Yellow
} else {
    Write-Host "✗ Setup failed. Please check your credentials." -ForegroundColor Red
    Write-Host "You can also use Docker instead: docker run -d -p 3306:3306 ..." -ForegroundColor Yellow
}
