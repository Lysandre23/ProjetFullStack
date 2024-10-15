package org.example.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.example.exception.PatientNotFoundException;
import org.example.model.Patient;
import org.example.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PatientRestController {

    @Autowired
    private PatientService service;

    @GetMapping(path = "/patients")
    public List<Patient> findAll(){
        return service.findAll();
    }

    @PostMapping(path = "/patients")
    public ResponseEntity<Patient> create(@RequestBody Patient p) throws URISyntaxException{
        service.create(p);
        return ResponseEntity.created(new URI("patient/"+p.getId())).build();
    }

    @DeleteMapping(path = "/patient/{id}")
    public void delete(@PathVariable("id") Long id){
        service.removeOne(id);
    }

    @ExceptionHandler
    public ResponseEntity<String> handle(PatientNotFoundException ex){
        return ResponseEntity.badRequest().body("Le patient n'existe pas");
    }

}
