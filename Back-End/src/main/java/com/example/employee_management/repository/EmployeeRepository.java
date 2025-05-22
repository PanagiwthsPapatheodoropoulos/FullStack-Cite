package com.example.employee_management.repository;

import com.example.employee_management.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    @Query("SELECT emp FROM Employee emp JOIN emp.attributes attr WHERE attr.id = :attributeId")
    List<Employee> findEmployeesByAttributeId(@Param("attributeId") UUID attributeId);

}
