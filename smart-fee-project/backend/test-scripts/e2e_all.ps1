<#
E2E script: e2e_all.ps1
- Starts backend jar with given webhook secret
- Runs positive E2E (login, create invoice, initiate payment, send webhook with correct signature) expecting PAID
- Restarts backend without secret and runs negative webhook test expecting rejection
Usage: .\e2e_all.ps1 [-WebhookSecret 'test_secret']
#>
param(
    [string]$WebhookSecret = 'test_secret'
)

function Kill-OnPort8080 {
    $lines = netstat -a -n -o | Select-String ":8080" | ForEach-Object { $_.Line }
    foreach ($l in $lines) {
        $p = ($l -split '\s+')[-1]
        if ($p -and ($p -as [int])) {
            Write-Output "Stopping PID $p"
            Stop-Process -Id $p -Force -ErrorAction SilentlyContinue
        }
    }
}

function Start-Backend([string]$secret) {
    Kill-OnPort8080
    Start-Sleep -Seconds 1
    $jar = Get-ChildItem target\*smart-fee-backend*.jar | Select-Object -Last 1
    if (-not $jar) { Write-Error 'JAR not found: build project first'; exit 2 }
    if ($secret) {
        Write-Output "Starting backend with secret"
        Start-Process -FilePath 'java' -ArgumentList "-Dpayment.webhook.secret=$secret","-jar","$($jar.FullName)" -NoNewWindow
    } else {
        Write-Output "Starting backend WITHOUT secret"
        Start-Process -FilePath 'java' -ArgumentList "-jar","$($jar.FullName)" -NoNewWindow
    }
    # wait for HTTP
    $base = 'http://localhost:8080/api'
    Write-Output 'Waiting for backend TCP listener on port 8080...'
    for ($i=0; $i -lt 120; $i++) {
        $line = (netstat -a -n -o | Select-String ":8080" | Select-Object -First 1).Line
        if ($line) {
            Write-Output "Port 8080 is listening"
            Start-Sleep -Seconds 2
            return
        }
        Start-Sleep -Seconds 1
    }
    Write-Error 'Backend did not open port 8080 in time'; exit 3
}

function Run-PositiveE2E([string]$secret) {
    $base = 'http://localhost:8080/api'
    $cred = @{ username='qa_user_1'; password='QaUser123!' }
    Write-Output 'Login (with retry until backend ready)'
    $login = $null
    for ($r=0; $r -lt 60; $r++) {
        try {
            $login = Invoke-RestMethod -Method Post -Uri "$base/auth/login" -Body (ConvertTo-Json $cred) -ContentType 'application/json' -ErrorAction Stop
            break
        } catch {
            Start-Sleep -Seconds 1
        }
    }
    if (-not $login) { Write-Error 'Login failed after retries'; exit 4 }
    $token = $login.token
    if (-not $token) { Write-Error 'Login did not return token'; exit 4 }
    $headers = @{ Authorization = "Bearer $token" }

    Write-Output 'Ensure apartment exists'
    $apts = Invoke-RestMethod -Uri "$base/apartments" -Headers $headers
    if (-not $apts -or $apts.Count -eq 0) {
        $aptPayload = @{ roomNumber='T-E2E-001'; area=50 }
        $createdApt = Invoke-RestMethod -Method Post -Uri "$base/apartments" -Headers $headers -Body (ConvertTo-Json $aptPayload) -ContentType 'application/json'
        $aptId = $createdApt.apartmentId
    } else { $aptId = $apts[0].apartmentId }

    Write-Output "Using apartment $aptId"
    $invoicePayload = @{ apartment = @{ apartmentId = $aptId }; billingMonth = (Get-Date).ToString('yyyy-MM-01'); dueDate = (Get-Date).ToString('yyyy-MM-15'); electricFee=100000; waterFee=20000; managementFee=150000; parkingFee=0; totalAmount=370000; status='PENDING' }
    Write-Output 'Create invoice'
    $created = Invoke-RestMethod -Method Post -Uri "$base/invoices" -Headers $headers -Body (ConvertTo-Json $invoicePayload) -ContentType 'application/json'
    $invoiceId = $created.invoiceId
    Write-Output "Invoice created: $invoiceId"

    Write-Output 'Initiate payment'
    $init = Invoke-RestMethod -Method Post -Uri "$base/payments" -Headers $headers -Body (ConvertTo-Json @{ invoiceId=[string]$invoiceId; method='VNPAY' }) -ContentType 'application/json'
    $tx = $init.transactionRef
    Write-Output "Transaction ref: $tx"

    Write-Output 'Compute signature and POST webhook'
    $clientSig = [System.Convert]::ToBase64String([System.Security.Cryptography.HMACSHA256]::new([System.Text.Encoding]::UTF8.GetBytes($secret)).ComputeHash([System.Text.Encoding]::UTF8.GetBytes($tx)))
    $web = @{ invoiceId=[string]$invoiceId; transactionId=$tx; signature=$clientSig }
    $resp = Invoke-RestMethod -Method Post -Uri "$base/payments/webhook" -Body (ConvertTo-Json $web) -ContentType 'application/json'
    Write-Output "Webhook resp: $($resp | ConvertTo-Json -Depth 3)"

    $invAfter = Invoke-RestMethod -Uri "$base/invoices/$invoiceId" -Headers $headers
    Write-Output "Invoice status after: $($invAfter.status)"
    if ($invAfter.status -ne 'PAID') { Write-Error 'Positive E2E failed: invoice not PAID'; exit 5 }
    Write-Output 'Positive E2E PASSED'
}

function Run-NegativeWebhook([string]$secret) {
    # assumes backend restarted WITHOUT secret
    $base = 'http://localhost:8080/api'
    $cred = @{ username='qa_user_1'; password='QaUser123!' }
    Write-Output 'Login (negative test)'
    $login = Invoke-RestMethod -Method Post -Uri "$base/auth/login" -Body (ConvertTo-Json $cred) -ContentType 'application/json'
    $token = $login.token; $headers = @{ Authorization = "Bearer $token" }

    $invoices = Invoke-RestMethod -Uri "$base/invoices" -Headers $headers
    $invoice = $invoices | Where-Object { $_.status -ne 'PAID' } | Select-Object -First 1
    if (-not $invoice) { Write-Output 'No unpaid invoice found for negative test; creating one'; $invoice = Invoke-RestMethod -Method Post -Uri "$base/invoices" -Headers $headers -Body (ConvertTo-Json @{ apartment=@{apartmentId = $invoices[0].apartment.apartmentId}; billingMonth=(Get-Date).ToString('yyyy-MM-01'); dueDate=(Get-Date).ToString('yyyy-MM-15'); electricFee=100000; waterFee=20000; managementFee=150000; parkingFee=0; totalAmount=370000; status='PENDING'}) -ContentType 'application/json' }
    $invoiceId = $invoice.invoiceId
    Write-Output "Using invoice $invoiceId for negative webhook"

    $init = Invoke-RestMethod -Method Post -Uri "$base/payments" -Headers $headers -Body (ConvertTo-Json @{ invoiceId=[string]$invoiceId; method='VNPAY' }) -ContentType 'application/json'
    $tx = $init.transactionRef
    $clientSig = [System.Convert]::ToBase64String([System.Security.Cryptography.HMACSHA256]::new([System.Text.Encoding]::UTF8.GetBytes($secret)).ComputeHash([System.Text.Encoding]::UTF8.GetBytes($tx)))

    try {
        $resp = Invoke-RestMethod -Method Post -Uri "$base/payments/webhook" -Body (ConvertTo-Json @{ invoiceId=[string]$invoiceId; transactionId=$tx; signature=$clientSig }) -ContentType 'application/json' -ErrorAction Stop
        Write-Error "Negative test failed: webhook accepted while backend has no secret; resp=$($resp | ConvertTo-Json -Depth 3)"; exit 6
    } catch {
        Write-Output "Negative webhook rejected as expected: $($_.Exception.Message)"
    }

    $invAfter = Invoke-RestMethod -Uri "$base/invoices/$invoiceId" -Headers $headers
    Write-Output "Invoice status after negative webhook: $($invAfter.status)"
    if ($invAfter.status -eq 'PAID') { Write-Error 'Invoice became PAID unexpectedly in negative test'; exit 7 }
    Write-Output 'Negative webhook test PASSED'
}

# --- Main flow ---
Set-Location (Split-Path -Parent $MyInvocation.MyCommand.Definition)
Set-Location '..'  # go to backend root

Start-Backend -secret $WebhookSecret
Run-PositiveE2E -secret $WebhookSecret

# Restart without secret
Kill-OnPort8080
Start-Sleep -Seconds 1
Start-Backend -secret $null
Run-NegativeWebhook -secret $WebhookSecret

Write-Output 'E2E all tests completed successfully'
