package org.example.rest;

import org.example.model.Reservation;
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
public class ReservationRestController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/reservations")
    public List<Reservation> findAll() {
        return reservationService.findAll();
    }

    @GetMapping("/reservations/{id}")
    public Reservation findById(@PathVariable Long id) {
        return reservationService.findAll().stream().filter(r -> r.getId().equals(id)).findFirst().get();
    }

    @PostMapping("/reservations")
    public ResponseEntity<Reservation> create(@RequestBody Reservation reservation) throws URISyntaxException {
        reservationService.create(reservation);
        return ResponseEntity.created(new URI("reservations/"+reservation.getId())).build();
    }
}
