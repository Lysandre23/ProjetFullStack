package org.example.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.example.exception.PatientNotFoundException;
import org.example.model.Patient;
import org.example.model.Reservation;
import org.example.service.PatientService;
import org.example.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
public class PatientRestController {

    @Autowired
    private PatientService service;

    @Autowired
    private ReservationService reservationService;

    @GetMapping(path = "")
    public List<Patient> findPatient(@RequestParam(required = false) String firstname, @RequestParam(required = false) String lastname) throws PatientNotFoundException {
        if(firstname != null && lastname != null) { return service.findByLastnameAndFirstname(lastname, firstname); }
        if(firstname != null) { return service.findByFirstname(firstname); }
        if(lastname != null) { return service.findByLastname(lastname); }
        System.out.println(firstname + " " + lastname);
        return service.findAll();
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable("id") Long id){
        service.removeOne(id);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable("id") Long id, @RequestBody Patient p) throws PatientNotFoundException {
        Patient updatedPatient = service.findOne(id);
        updatedPatient.setFirstname(p.getFirstname());
        updatedPatient.setLastname(p.getLastname());
        updatedPatient.setBirthdate(p.getBirthdate());
        updatedPatient.setEmail(p.getEmail());
        updatedPatient.setPhone(p.getPhone());
        service.create(updatedPatient);
    }

    @ExceptionHandler
    public ResponseEntity<String> handle(PatientNotFoundException ex){
        return ResponseEntity.badRequest().body("Le patient n'existe pas");
    }

    @GetMapping("/{id}/reservations")
    public List<Reservation> getPatientReservations(@PathVariable("id") Long id) throws PatientNotFoundException {
        Patient patient = service.findOne(id);
        return patient.getReservations();
    }

    @PostMapping("/{id}/reservations")
    public Reservation createReservation(@PathVariable("id") Long id, @RequestBody Reservation reservation) throws PatientNotFoundException {
        Patient patient = service.findOne(id);
        reservation.setPatient(patient);
        return reservationService.create(reservation);
    }

    @PostMapping("")
    public ResponseEntity<Patient> save(@RequestBody Patient patient) throws URISyntaxException {
        service.create(patient);
        return ResponseEntity.created(new URI("patients/" + patient.getId())).body(patient);
    }

}
