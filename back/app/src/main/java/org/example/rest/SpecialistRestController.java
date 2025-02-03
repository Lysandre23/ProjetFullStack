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
@RequestMapping("/api/specialists")
public class SpecialistRestController {

    @Autowired
    private SpecialistService service;

    @GetMapping(path = "")
    public List<Specialist> findAll() {
        return service.findAll();
    }

    @GetMapping("specialty/{specialty}")
    public List<Specialist> findBySpecialty(@PathVariable("specialty") String specialty) {
        return service.findBySpecialty(specialty);
    }

    @PostMapping("")
    public ResponseEntity<Specialist> createSpecialist(@RequestBody Specialist specialist) throws URISyntaxException {
        service.create(specialist);
        return ResponseEntity.created(new URI("specialists/" + specialist.getId())).build();
    }
}
