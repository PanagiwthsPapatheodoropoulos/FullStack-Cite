package com.example.employee_management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "employees")
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @Column(name = "emp_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "emp_name", nullable = false)
    private String name;

    @Column(name = "emp_dateofbirth", nullable = false)
    private Date birthDate;

    @Column(name = "emp_hascar", nullable = false)
    private boolean hasCar;

    @Column(name = "emp_address", nullable = false)
    private String address;

    @Column(name = "emp_latitude", precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(name = "emp_longitude", precision = 11, scale = 8)
    private BigDecimal longitude;

    @ManyToOne
    @JoinColumn(name = "emp_supervisorid", referencedColumnName = "emp_id")
    private Employee supervisor;

    @CreationTimestamp
    @Column(name = "emp_createdat", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "emp_updatedat", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
            name = "employee_attributes",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "attribute_id")
    )
    private Set<Attribute> attributes = new HashSet<>();

    public void addAttribute(Attribute attribute) {
        this.attributes.add(attribute);
    }

    public void removeAttribute(Attribute attribute) {
        this.attributes.remove(attribute);
    }
}