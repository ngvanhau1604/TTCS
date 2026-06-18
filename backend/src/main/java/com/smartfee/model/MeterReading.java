package com.smartfee.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "meter_readings", uniqueConstraints = {
        @UniqueConstraint(name = "uk_meter_reading_month_apartment", columnNames = { "apartment_id", "month_year" })
})
public class MeterReading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer meterReadingId;

    @ManyToOne
    @JoinColumn(name = "apartment_id", nullable = false)
    private Apartment apartment;

    @Column(name = "month_year", nullable = false, length = 7)
    private String monthYear;

    @Column(name = "elec_old", nullable = false)
    private Integer elecOld;

    @Column(name = "elec_new", nullable = false)
    private Integer elecNew;

    @Column(name = "water_old", nullable = false)
    private Integer waterOld;

    @Column(name = "water_new", nullable = false)
    private Integer waterNew;

    @Column(length = 50)
    private String createdBy;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Integer getMeterReadingId() {
        return meterReadingId;
    }

    public void setMeterReadingId(Integer meterReadingId) {
        this.meterReadingId = meterReadingId;
    }

    public Apartment getApartment() {
        return apartment;
    }

    public void setApartment(Apartment apartment) {
        this.apartment = apartment;
    }

    public String getMonthYear() {
        return monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public Integer getElecOld() {
        return elecOld;
    }

    public void setElecOld(Integer elecOld) {
        this.elecOld = elecOld;
    }

    public Integer getElecNew() {
        return elecNew;
    }

    public void setElecNew(Integer elecNew) {
        this.elecNew = elecNew;
    }

    public Integer getWaterOld() {
        return waterOld;
    }

    public void setWaterOld(Integer waterOld) {
        this.waterOld = waterOld;
    }

    public Integer getWaterNew() {
        return waterNew;
    }

    public void setWaterNew(Integer waterNew) {
        this.waterNew = waterNew;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getElectricUsage() {
        return Math.max(0, elecNew - elecOld);
    }

    public int getWaterUsage() {
        return Math.max(0, waterNew - waterOld);
    }
}