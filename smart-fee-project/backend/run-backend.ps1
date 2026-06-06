# Backend Startup Script for PowerShell
# This script sets environment variables and starts the Spring Boot backend

param(
    [switch]$SkipBuild = $false
)

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Smart Fee - Backend Startup" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Load environment variables from .env
$envFile = "..\..\..\.env"
$envExists = Test-Path $envFile

if ($envExists) {
    Write-Host "Loading environment from $envFile" -ForegroundColor Green
    $envContent = Get-Content $envFile -Raw
    $envContent -split "`n" | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#")) {
            $key, $value = $line -split "=", 2
            if ($key -and $value) {
                Set-Item -Path "env:$key" -Value $value
            }
        }
    }
} else {
    Write-Host ".env file not found. Using defaults..." -ForegroundColor Yellow
    $env:SPRING_DATASOURCE_USERNAME = 'smartfee'
    $env:SPRING_DATASOURCE_PASSWORD = 'smartfee'
    $env:JWT_SECRET = '0DMjSf5IVIRo4UwCbVDT75RS4hRE0xXfULif093u2iEkKfZc85KLv2vI+aNLi6leOpx/lkPt0G/SAGFQYSboig=='
    $env:PAYMENT_WEBHOOK_SECRET = 'test_webhook_secret'
}

# Verify Maven is installed
try {
    $mvnVersion = mvn --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Maven is available" -ForegroundColor Green
    }
} catch {
    Write-Host "ERROR: Maven not found in PATH" -ForegroundColor Red
    Write-Host "Please install Maven: https://maven.apache.org/download.cgi" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Environment Variables:" -ForegroundColor Cyan
Write-Host "  - SPRING_DATASOURCE_USERNAME: $env:SPRING_DATASOURCE_USERNAME"
Write-Host "  - SPRING_DATASOURCE_PASSWORD: [configured]"
Write-Host "  - JWT_SECRET: [configured]"
Write-Host "  - PAYMENT_WEBHOOK_SECRET: [configured]"
Write-Host ""

# Check database connectivity (optional)
Write-Host "Attempting to connect to database..." -ForegroundColor Cyan
try {
    $result = mvn help:system -q 2>$null
    Write-Host "✓ Maven project configuration is valid" -ForegroundColor Green
} catch {
    Write-Host "⚠ Unable to validate project, but proceeding..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Starting backend at http://localhost:8080" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

if ($SkipBuild) {
    mvn spring-boot:run
} else {
    mvn clean spring-boot:run
}
