package com.example.employee_management.controller;

import com.example.employee_management.dto.AttributeDTO;
import com.example.employee_management.service.AttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Attr;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/attributes")
@RequiredArgsConstructor//i inject dependency only on final fields
@CrossOrigin(origins = "*")
public class AttributeController {

    private final AttributeService attributeService;

    @GetMapping
    public ResponseEntity<List<AttributeDTO>> getAllAttributes() {
        return ResponseEntity.ok(attributeService.getAllAttributes());
    }
    @GetMapping("/{id}")
    public ResponseEntity<AttributeDTO> getAttributeById(UUID id){
        return ResponseEntity.ok(attributeService.getAttributeById(id));
    }

    @PostMapping
    public ResponseEntity<AttributeDTO> createAttribute(AttributeDTO attributeDTO){
        return ResponseEntity.ok(attributeService.createAttribute(attributeDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttributeDTO> updateAttribute(@PathVariable UUID id,AttributeDTO attributeDTO){
        return ResponseEntity.ok(attributeService.updateAttribute(id,attributeDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AttributeDTO> patchAttribute(@PathVariable UUID id,@RequestBody AttributeDTO attributeDTO){
        AttributeDTO updatedAttribute = attributeService.patchAttribute(id,attributeDTO);
        return ResponseEntity.ok(updatedAttribute);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttribute(@PathVariable UUID id){
        attributeService.deleteAttribute(id);
        return ResponseEntity.noContent().build();
    }
}
