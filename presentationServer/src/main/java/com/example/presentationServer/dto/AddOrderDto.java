package com.example.presentationServer.dto;

public record AddOrderDto(
    String name,
    String phone,
    String price,
    String email,
    String description
) {
}
