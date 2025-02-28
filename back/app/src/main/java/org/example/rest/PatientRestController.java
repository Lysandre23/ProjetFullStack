package org.example.rest;

import org.example.exception.PatientNotFoundException;
import org.example.model.Patient;
import org.example.model.Reservation;
import org.example.repository.PatientRepository;
import org.example.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientRestController {

    private final PatientService patientService;
    private final PatientRepository patientRepository;

    @Autowired
    public PatientRestController(PatientService patientService, PatientRepository patientRepository) {
        this.patientService = patientService;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.findAll();
    }

    @GetMapping("/{id}")
    public Patient findOne(@PathVariable Long id) {
        return patientService.findOne(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        if (!patientService.existsById(id)) {
            throw new PatientNotFoundException(id);
        }
        patient.setId(id);
        Patient updatedPatient = patientService.save(patient);
        return ResponseEntity.ok(updatedPatient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        if (!patientService.existsById(id)) {
            throw new PatientNotFoundException(id);
        }
        patientService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search/lastname/{lastname}")
    public List<Patient> findPatientsByLastName(@PathVariable String lastname) {
        return patientService.findByLastname(lastname);
    }

    @GetMapping("/search/firstname/{firstname}")
    public List<Patient> findPatientsByFirstName(@PathVariable String firstname) {
        return patientService.findByFirstname(firstname);
    }

    @GetMapping("/{id}/reservations")
    public List<Reservation> getPatientReservations(@PathVariable Long id) {
        Patient patient = patientService.findOne(id);
        return patient.getReservations();
    }

    @ExceptionHandler(PatientNotFoundException.class)
    public ResponseEntity<String> handlePatientNotFound(PatientNotFoundException ex) {
        return ResponseEntity.notFound().build();
    }
}
