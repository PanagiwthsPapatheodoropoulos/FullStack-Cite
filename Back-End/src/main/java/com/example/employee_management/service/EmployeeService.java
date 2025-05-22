package com.example.employee_management.service;

import com.example.employee_management.dto.EmployeeDTO;
import com.example.employee_management.model.Attribute;
import com.example.employee_management.model.Employee;
import com.example.employee_management.repository.AttributeRepository;
import com.example.employee_management.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final AttributeRepository attributeRepository;
    private final ModelMapper modelMapper;


    private EmployeeDTO convertToDTO(Employee employee){
        EmployeeDTO employeeDTO = modelMapper.map(employee, EmployeeDTO.class);
        employeeDTO.setAttributeIds(
                employee.getAttributes().stream()
                        .map(Attribute::getId)
                        .collect(Collectors.toSet())
        );
        return employeeDTO;
    }
    @Transactional(readOnly = true)
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(this::convertToDTO).toList();
    }

    @Transactional(readOnly = true)
    public EmployeeDTO getEmployeeById(UUID id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Εργαζόμενος με id " + id + " δεν βρέθηκε"));
        return convertToDTO(employee);
    }

    private Employee convertToEntity(EmployeeDTO employeeDTO){
        Employee employee = modelMapper.map(employeeDTO,Employee.class);

        if (employeeDTO.getAttributeIds() != null) {
            Set<Attribute> attributes = employeeDTO.getAttributeIds().stream()
                    .map(attributeId -> attributeRepository.findById(attributeId)
                            .orElseThrow(() -> new EntityNotFoundException("Χαρακτηριστικό με id " + attributeId + " δεν βρέθηκε"))
                    )
                    .collect(Collectors.toSet());
            employee.setAttributes(attributes);
        }
        return employee;
    }

    @Transactional(readOnly = false)
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO){
        Employee employee = convertToEntity(employeeDTO);
        Employee savedEmployee = employeeRepository.save(employee);
        return convertToDTO(savedEmployee);
    }



    private void updateEmployeeAttributes(Employee employee, Set<UUID> attributeIds) {
        employee.getAttributes().clear();

        if (attributeIds != null && !attributeIds.isEmpty()) {
            Set<Attribute> attributes = attributeIds.stream()
                    .map(attributeId -> attributeRepository.findById(attributeId)
                            .orElseThrow(() -> new EntityNotFoundException("Χαρακτηριστικό με id " + attributeId + " δεν βρέθηκε"))
                    )
                    .collect(Collectors.toSet());
            employee.getAttributes().addAll(attributes);
        }
    }
    @Transactional(readOnly = false)
    public EmployeeDTO updateEmployee(UUID id, EmployeeDTO employeeDTO){
        Employee employee = employeeRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Εργαζόμενος με id " + id + " δεν βρέθηκε"));

        //εφόσον βρέθηκε ο εργαζόμενος, ενημερώνουμε τα πεδία του
        employee.setName(employeeDTO.getName());
        employee.setBirthDate(new Date(employeeDTO.getBirthDate().getTime()));
        employee.setHasCar(employeeDTO.getHasCar());
        employee.setAddress(employeeDTO.getAddress());
        employee.setLatitude(employeeDTO.getLatitude());
        employee.setLongitude(employeeDTO.getLongitude());

        updateEmployeeAttributes(employee, employeeDTO.getAttributeIds());

        Employee updatedEmployee = employeeRepository.save(employee);
        return convertToDTO(updatedEmployee);
    }

    @Transactional(readOnly = false)
    public EmployeeDTO patchEmployee(UUID id,EmployeeDTO employeeDTO){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Εργαζόμενος με id " + id + " δεν βρέθηκε"
                ));
        if (employeeDTO.getName() != null) {
            employee.setName(employeeDTO.getName());
        }

        if (employeeDTO.getBirthDate() != null) {
            employee.setBirthDate(new Date(employeeDTO.getBirthDate().getTime()));
        }

        if (employeeDTO.getHasCar() != null) {
            employee.setHasCar(employeeDTO.getHasCar());
        }
        if (employeeDTO.getAddress() != null) {
            employee.setAddress(employeeDTO.getAddress());
        }

        if (employeeDTO.getLatitude() != null && employeeDTO.getLongitude() != null) {
            employee.setLatitude(employeeDTO.getLatitude());
            employee.setLongitude(employeeDTO.getLongitude());
        }

        if(employeeDTO.getAttributeIds() !=null){
            updateEmployeeAttributes(employee,employeeDTO.getAttributeIds());
        }

        employeeRepository.save(employee);
        return convertToDTO(employee);

    }


    @Transactional(readOnly = false)
    public void deleteEmployee(UUID id){
        if(!employeeRepository.existsById(id)){
            throw new EntityNotFoundException("Εργαζόμενος με id " + id + " δεν βρέθηκε");
        }
        employeeRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<EmployeeDTO> findEmployeesByAttributeId(UUID attributeId){
        return employeeRepository.findEmployeesByAttributeId(attributeId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


}