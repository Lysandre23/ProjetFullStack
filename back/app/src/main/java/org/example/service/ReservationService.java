package org.example.service;

import org.example.model.Reservation;
import org.example.model.Specialist;
import org.example.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public Specialist findSpecialistByReservationId(Integer specialistid) {
        return reservationRepository.findSpecialist(specialistid);
    }

    public void create(Reservation reservation) { reservationRepository.save(reservation); }
}
