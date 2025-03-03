package org.example.rest;

import org.example.exception.UserNotFoundException;
import org.example.exception.PatientNotFoundException;
import org.example.model.Patient;
import org.example.model.Reservation;
import org.example.model.Specialist;
import org.example.model.Center;
import org.example.service.PatientService;
import org.example.service.ReservationService;
import org.example.service.SpecialistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("{id}")
    public Specialist findById(@PathVariable("id") Long id) {
        Optional<Specialist> specialist = service.findById(id);
        return specialist.orElse(null);
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

    @GetMapping("/admin/{id}")
    public ResponseEntity<Boolean> isAdmin(@PathVariable Long id) {
        Optional<Specialist> specialist = service.findById(id);
        if (specialist.isPresent()) {
            return ResponseEntity.ok(specialist.get().isAdmin());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/superadmin/{id}")
    public ResponseEntity<Boolean> isSuperAdmin(@PathVariable Long id) {
        Optional<Specialist> specialist = service.findById(id);
        if (specialist.isPresent()) {
            return ResponseEntity.ok(specialist.get().isSuperAdmin());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/center")
    public ResponseEntity<Center> getSpecialistCenter(@PathVariable("id") Long id) {
        Optional<Specialist> specialist = service.findById(id);
        if (specialist.isPresent() && specialist.get().getCenter() != null) {
            return ResponseEntity.ok(specialist.get().getCenter());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Specialist> updateSpecialist(@PathVariable Long id, @RequestBody Specialist specialistData) {
        Optional<Specialist> existingSpecialist = service.findById(id);
        if (!existingSpecialist.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Specialist specialist = existingSpecialist.get();
        specialist.setFirstname(specialistData.getFirstname());
        specialist.setLastname(specialistData.getLastname());
        specialist.setEmail(specialistData.getEmail());
        specialist.setSpecialty(specialistData.getSpecialty());
        specialist.setPhone(specialistData.getPhone());
        // Don't update admin/superAdmin status through this endpoint for security

        Specialist updatedSpecialist = service.updateSpecialist(specialist);
        return ResponseEntity.ok(updatedSpecialist);
    }
}
