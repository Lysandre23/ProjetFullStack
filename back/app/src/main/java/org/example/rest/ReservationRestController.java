package org.example.rest;

import org.example.model.Reservation;
import org.example.model.Specialist;
import org.example.repository.ReservationRepository;
import org.example.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationRestController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("")
    public List<Reservation> findAll() {
        return reservationService.findAll();
    }

    @GetMapping("/{reservationId}/specialist")
    public ResponseEntity<Specialist> findSpecialistByReservationId(@PathVariable Integer reservationId) {
        Specialist specialist = reservationService.findSpecialistByReservationId(reservationId);
        if (specialist == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(specialist);
    }

    @PostMapping("")
    public ResponseEntity<Reservation> create(@RequestBody Reservation reservation) throws URISyntaxException {
        // Validate required fields
        if (reservation.getSpecialist() == null || reservation.getPatient() == null || reservation.getDate() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        Reservation savedReservation = reservationService.create(reservation);
        return ResponseEntity
            .created(new URI("/api/reservations/" + savedReservation.getId()))
            .body(savedReservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        reservationService.removeOne(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/done")
    public ResponseEntity<Reservation> markAsDone(@PathVariable Integer id) {
        Reservation updatedReservation = reservationService.markAsDone(id);
        return ResponseEntity.ok(updatedReservation);
    }
}
