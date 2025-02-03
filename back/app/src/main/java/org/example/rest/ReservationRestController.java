package org.example.rest;

import org.example.model.Reservation;
import org.example.model.Specialist;
import org.example.repository.ReservationRepository;
import org.example.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

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

    @GetMapping("/{specialistid}/specialist")
    public Specialist findSpecialistByReservationId(@PathVariable Integer specialistid) {
        return reservationService.findSpecialistByReservationId(specialistid);
    }

    @PostMapping("")
    public ResponseEntity<Reservation> create(@RequestBody Reservation reservation) throws URISyntaxException {
        reservationService.create(reservation);
        return ResponseEntity.created(new URI("api/reservations/"+reservation.getId())).build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        reservationService.removeOne(id);
    }
}
