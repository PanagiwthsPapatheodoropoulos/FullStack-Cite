package com.example.employee_management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Table(name = "attributes")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Attribute {

    @Id
    @Column(name = "attr_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "attr_name")
    private String name;

    @Column(name = "attr_value")
    private String value;

    @UpdateTimestamp
    @Column(name = "attr_createdat",nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "attr_updatedat",nullable = false)
    private LocalDateTime updatedAt;

    @ManyToMany(mappedBy = "attributes")
    private Set<Employee> employees = new HashSet<>();
}
