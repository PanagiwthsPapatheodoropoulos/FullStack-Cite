package com.example.employee_management.service;

import com.example.employee_management.dto.AttributeDTO;
import com.example.employee_management.model.Attribute;
import com.example.employee_management.repository.AttributeRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;



@RequiredArgsConstructor
@Service
public class AttributeService {

    private final AttributeRepository attributeRepository;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<AttributeDTO> getAllAttributes(){
        return attributeRepository.findAll().stream()
                .map(attribute -> modelMapper.map(attribute, AttributeDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AttributeDTO getAttributeById(UUID id){
        Attribute attribute = attributeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Χαρακτηριστικό με id " + id + "δεν βρέθηκε"));
        return modelMapper.map(attribute, AttributeDTO.class);
    }

    @Transactional(readOnly = false)
    public AttributeDTO createAttribute(AttributeDTO attributeDTO){
        if(attributeRepository.existsByName(attributeDTO.getName())){
            throw new EntityExistsException("Χαρακτηριστικό με όνομα " + attributeDTO.getName() + "υπάρχει ήδη");
        }

        Attribute attribute = modelMapper.map(attributeDTO, Attribute.class);
        Attribute savedAttribute = attributeRepository.save(attribute);
        return modelMapper.map(savedAttribute,AttributeDTO.class);
    }

    @Transactional(readOnly = false)
    public AttributeDTO updateAttribute(UUID id,AttributeDTO attributeDTO){
        Attribute attribute = attributeRepository.findById(id).
                orElseThrow(() ->new EntityNotFoundException("Χαρακτηριστικό με id " + id + "δεν βρέθηκε"));

        if(attributeRepository.existsByName(attributeDTO.getName())){
            throw new EntityExistsException("Χαρακτηριστικό με όνομα " + attributeDTO.getName() + "υπάρχει ήδη");
        }

        attribute.setName(attributeDTO.getName());
        Attribute updatedAttribute = attributeRepository.save(attribute);
        return modelMapper.map(updatedAttribute,AttributeDTO.class);


    }

    @Transactional(readOnly = false)
    public AttributeDTO patchAttribute(UUID id, AttributeDTO attributeDTO){
        Attribute attribute = attributeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Χαρακτηριστικό με id " + id + "δεν βρέθηκε"
                ));

        if(attributeDTO.getName() != null){
            attribute.setName(attributeDTO.getName());
        }

        attributeRepository.save(attribute);

        return modelMapper.map(attribute, AttributeDTO.class);
    }

    @Transactional(readOnly = false)
    public void deleteAttribute(UUID id){
        if(!attributeRepository.existsById(id)){
            throw new EntityNotFoundException("Χαρακτηριστικό με id " + id + "δεν βρέθηκε");
        }
        attributeRepository.deleteById(id);
    }

}
