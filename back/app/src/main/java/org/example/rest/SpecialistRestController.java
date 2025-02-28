package org.example.rest;

import org.example.exception.UserNotFoundException;
import org.example.exception.PatientNotFoundException;
import org.example.model.Patient;
import org.example.model.Reservation;
import org.example.model.Specialist;
import org.example.service.PatientService;
import org.example.service.ReservationService;
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

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private PatientService patientService;

    @GetMapping(path = "")
    public List<Specialist> findAll() {
        return service.findAll();
    }

    @GetMapping("specialty/{specialty}")
    public List<Specialist> findBySpecialty(@PathVariable("specialty") String specialty) {
        return service.findBySpecialty(specialty);
    }

    @GetMapping("/{id}/reservations")
    public List<Reservation> getSpecialistReservations(@PathVariable("id") Long id) {
        return service.getReservationsBySpecialistId(id);
    }

    @PostMapping("/{id}/reservations")
    public ResponseEntity<Reservation> createReservation(
            @PathVariable("id") Long specialistId,
            @RequestParam("patientId") Long patientId,
            @RequestBody Reservation reservation) throws URISyntaxException, PatientNotFoundException {
        
        // Get the specialist
        Specialist specialist = service.findById(specialistId)
                .orElseThrow(() -> new RuntimeException("Specialist not found"));
        
        // Get the patient
        Patient patient = patientService.findOne(patientId);
        
        // Set the relationships
        reservation.setSpecialist(specialist);
        reservation.setPatient(patient);
        
        // Save the reservation
        Reservation savedReservation = reservationService.create(reservation);
        
        return ResponseEntity.created(new URI("/api/reservations/" + savedReservation.getId()))
                .body(savedReservation);
    }

    @PostMapping("")
    public ResponseEntity<Specialist> createSpecialist(@RequestBody Specialist specialist) throws URISyntaxException {
        // Ensure admin flags are properly initialized if not set
        if (specialist.isAdmin() || specialist.isSuperAdmin()) {
            specialist.setAdmin(true);
            if (specialist.isSuperAdmin()) {
                specialist.setSuperAdmin(true);
            }
        }
        
        Specialist savedSpecialist = service.create(specialist);
        return ResponseEntity
            .created(new URI("/api/specialists/" + savedSpecialist.getId()))
            .body(savedSpecialist);
    }

    @GetMapping("/admins")
    public List<Specialist> findAllAdmins() {
        return service.findAllAdmins();
    }

    @GetMapping("/superadmins")
    public List<Specialist> findAllSuperAdmins() {
        return service.findAllSuperAdmins();
    }

    @PutMapping("/{id}/promote/admin")
    public ResponseEntity<?> promoteToAdmin(@PathVariable Long id) {
        service.promoteToAdmin(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/promote/superadmin")
    public ResponseEntity<?> promoteToSuperAdmin(@PathVariable Long id) {
        service.promoteToSuperAdmin(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/demote/admin")
    public ResponseEntity<?> demoteFromAdmin(@PathVariable Long id) {
        service.demoteFromAdmin(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/demote/superadmin")
    public ResponseEntity<?> demoteFromSuperAdmin(@PathVariable Long id) {
        service.demoteFromSuperAdmin(id);
        return ResponseEntity.ok().build();
    }
}
