package com.smartfee.dto;

public class MeterReadingRequest {
    private Integer apartmentId;
    private String monthYear;
    private Integer elecOld;
    private Integer elecNew;
    private Integer waterOld;
    private Integer waterNew;
    private String createdBy;

    public Integer getApartmentId() {
        return apartmentId;
    }

    public void setApartmentId(Integer apartmentId) {
        this.apartmentId = apartmentId;
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
}