package org.example.rest;

import org.example.exception.UserNotFoundException;
import org.example.model.Specialist;
import org.example.service.SpecialistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
public class SpecialistRestController {

    @Autowired
    private SpecialistService service;

    @GetMapping(path = "/specialists")
    public List<Specialist> findAll() {
        return service.findAll();
    }

    @PostMapping("/specialists")
    public ResponseEntity<Specialist> createSpecialist(@RequestBody Specialist specialist) throws URISyntaxException {
        Specialist savedSpecialist = service.create(specialist);
        return ResponseEntity.created(new URI("specialists/" + savedSpecialist.getId())).build();
    }
}
