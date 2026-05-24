package com.smartfee.model;

import jakarta.persistence.*;

@Entity
@Table(name = "apartments")
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer apartmentId;

    @Column(nullable = false, unique = true, length = 10)
    private String roomNumber;

    private Double area;

    @Column(length = 20)
    private String occupancyStatus = "OCCUPIED";

    private Integer motorbikeSlots = 1;

    private Integer carSlots = 0;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    // getters/setters
    public Integer getApartmentId() {
        return apartmentId;
    }

    public void setApartmentId(Integer apartmentId) {
        this.apartmentId = apartmentId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public String getOccupancyStatus() {
        return occupancyStatus;
    }

    public void setOccupancyStatus(String occupancyStatus) {
        this.occupancyStatus = occupancyStatus;
    }

    public Integer getMotorbikeSlots() {
        return motorbikeSlots;
    }

    public void setMotorbikeSlots(Integer motorbikeSlots) {
        this.motorbikeSlots = motorbikeSlots;
    }

    public Integer getCarSlots() {
        return carSlots;
    }

    public void setCarSlots(Integer carSlots) {
        this.carSlots = carSlots;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}