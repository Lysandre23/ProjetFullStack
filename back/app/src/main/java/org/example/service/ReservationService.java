package org.example.service;

import org.example.model.Reservation;
import org.example.model.Specialist;
import org.example.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReservationService {
    
    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> findById(Integer id) {
        return reservationRepository.findById(id);
    }

    public Specialist findSpecialistByReservationId(Integer reservationId) {
        try {
            return reservationRepository.findSpecialist(reservationId);
        } catch (Exception e) {
            return null;
        }
    }

    public Reservation create(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void removeOne(Integer id) {
        reservationRepository.deleteById(id);
    }

    public List<Reservation> findByPatientId(Long patientId) {
        return reservationRepository.findByPatientId(patientId);
    }

    public List<Reservation> findBySpecialistId(Long specialistId) {
        return reservationRepository.findBySpecialistId(specialistId);
    }

    public Reservation markAsDone(Integer id) {
        return reservationRepository.findById(id)
                .map(reservation -> {
                    reservation.setDone(true);
                    return reservationRepository.save(reservation);
                })
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    public Reservation update(Integer id, Reservation reservation) {
        return reservationRepository.findById(id)
                .map(existingReservation -> {
                    reservation.setId(id);
                    return reservationRepository.save(reservation);
                })
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }
}
