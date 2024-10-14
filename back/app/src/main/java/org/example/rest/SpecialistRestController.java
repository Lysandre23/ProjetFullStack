package org.example.rest;

import org.example.exception.UserNotFoundException;
import org.example.service.Specialist;
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
    public List<Specialist> findAll() throws UserNotFoundException {
        return service.findAll();
    }

    @GetMapping(path = "/specialist/{name}")
    public Specialist findByName(@PathVariable String name) throws UserNotFoundException {
        return service.findAll().stream().filter(u -> u.getName().equals(name)).findFirst().orElse(null);
    }

    @PostMapping("/specialist")
    public ResponseEntity<Specialist> create(@RequestBody Specialist specialist) throws URISyntaxException {
        service.create(specialist);
        return ResponseEntity.created(new URI("user/" + specialist.getId())).build();
    }
}
