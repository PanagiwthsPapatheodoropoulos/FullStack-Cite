package com.example.employee_management.dto;

import com.example.employee_management.model.Attribute;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Data
public class EmployeeDTO {

    private UUID id;

    @NotBlank(message = "Το όνομα είναι υποχρεωτικό")
    private String name;

    @NotNull(message = "Η ημερομηνία γέννησης είναι υποχρεωτική")
    @Past(message = "Η ημερομηνία γέννησης πρέπει να είναι στο παρελθόν")
    private Date birthDate;

    @NotNull(message = "Η πληροφορία για αυτοκίνητο είναι υποχρεωτική")
    private Boolean hasCar;

    @NotBlank(message = "Η διεύθυνση είναι υποχρεωτική")
    private String address;

//    @NotNull(message = "Η διεύθυνση είναι υποχρεωτική")
//    private UUID supervisorId;

    private BigDecimal latitude;
    private BigDecimal longitude;
    private Set<UUID> attributeIds;

}
