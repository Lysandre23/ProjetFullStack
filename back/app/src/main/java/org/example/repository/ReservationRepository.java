package org.example.repository;

import org.example.model.Reservation;
import org.example.model.Specialist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    @Query("select s from Specialist s where s.id = :specialistid")
    Specialist findSpecialist(@Param("specialistid") Integer specialistid);
}
