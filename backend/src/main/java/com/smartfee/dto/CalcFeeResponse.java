package com.smartfee.dto;

public class CalcFeeResponse {
    private Integer totalCalculated;
    private Boolean success;
    private String message;

    public CalcFeeResponse() {
    }

    public CalcFeeResponse(Integer totalCalculated, Boolean success, String message) {
        this.totalCalculated = totalCalculated;
        this.success = success;
        this.message = message;
    }

    public Integer getTotalCalculated() {
        return totalCalculated;
    }

    public void setTotalCalculated(Integer totalCalculated) {
        this.totalCalculated = totalCalculated;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
