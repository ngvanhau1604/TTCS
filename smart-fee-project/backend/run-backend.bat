@echo off
REM Backend Startup Script for Windows
REM This script sets environment variables and starts the Spring Boot backend

cd /d "%~dp0"

echo ======================================
echo Smart Fee - Backend Startup
echo ======================================
echo.

REM Load environment variables
if exist "..\..\.env" (
    echo Loading environment from ..\..\.env
    for /f "delims=" %%x in ('..\..\.env') do (
        set "%%x"
    )
) else (
    echo .env file not found. Using defaults...
    set "SPRING_DATASOURCE_USERNAME=smartfee"
    set "SPRING_DATASOURCE_PASSWORD=smartfee"
    set "JWT_SECRET=0DMjSf5IVIRo4UwCbVDT75RS4hRE0xXfULif093u2iEkKfZc85KLv2vI+aNLi6leOpx/lkPt0G/SAGFQYSboig=="
    set "PAYMENT_WEBHOOK_SECRET=test_webhook_secret"
)

REM Verify Maven is installed
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Maven not found in PATH
    echo Please install Maven or add it to your PATH
    echo Visit: https://maven.apache.org/download.cgi
    exit /b 1
)

echo.
echo Environment Variables:
echo  - SPRING_DATASOURCE_USERNAME: %SPRING_DATASOURCE_USERNAME%
echo  - SPRING_DATASOURCE_PASSWORD: [configured]
echo  - JWT_SECRET: [configured]
echo  - PAYMENT_WEBHOOK_SECRET: [configured]
echo.
echo Starting backend...
echo.

call mvn clean spring-boot:run

pause
