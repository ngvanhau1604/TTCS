package com.smartfee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmartFeeApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartFeeApplication.class, args);
    }
}