package com.example.employee_management.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;
@Data
public class AttributeDTO {
    private UUID id;

    @NotBlank(message = "Το όνομα χαρακτηριστικού είναι υποχρεωτικό")
    private String name;

}
