@echo off
setlocal enabledelayedexpansion

cd /d "%USERPROFILE%\Downloads\mysql-enterprise-9.7.0_winx64_bundle\mysql-commercial-9.7.0-winx64\bin" 2>nul
if errorlevel 1 (
    echo MySQL directory not found. Trying alternative path...
    cd /d "D:\Download\mysql-enterprise-9.7.0_winx64_bundle\mysql-commercial-9.7.0-winx64\bin"
)

set MYSQL_PATH=%cd%\mysql.exe
set DB_PATH=D:\PTIT\Thực tập cơ sở\Project\smart-fee-project\backend\src\main\resources\db

echo.
echo Importing database schema...
"%MYSQL_PATH%" -u root -p16042005 smartfee_db < "%DB_PATH%\01_create_schema.sql"

if errorlevel 1 (
    echo.
    echo Error importing schema!
    pause
    exit /b 1
)

echo.
echo Importing sample data...
"%MYSQL_PATH%" -u root -p16042005 smartfee_db < "%DB_PATH%\02_insert_sample_data.sql"

if errorlevel 1 (
    echo.
    echo Error importing data!
    pause
    exit /b 1
)

echo.
echo Success! Database created and populated.
echo.
pause
