package org.example.repository;

import org.example.model.Reservation;
import org.example.model.Specialist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    @Query("select r.specialist from Reservation r where r.id = :reservationId")
    Specialist findSpecialist(@Param("reservationId") Integer reservationId);

    List<Reservation> findByPatientId(Long patientId);
    List<Reservation> findBySpecialistId(Long specialistId);
}
