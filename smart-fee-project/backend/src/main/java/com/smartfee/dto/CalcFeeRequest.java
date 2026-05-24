package com.smartfee.dto;

public class CalcFeeRequest {
    private Integer month;
    private Integer year;

    public CalcFeeRequest() {
    }

    public CalcFeeRequest(Integer month, Integer year) {
        this.month = month;
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
