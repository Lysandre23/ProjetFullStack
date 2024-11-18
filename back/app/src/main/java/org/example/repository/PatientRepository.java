package org.example.repository;

import org.example.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query("SELECT p FROM Patient p WHERE LOWER(p.lastname) = LOWER(:lastname) AND LOWER(p.firstname) = LOWER(:firstname)")
    public List<Patient> findByLastnameAndFirstname(@Param("lastname") String lastname, @Param("firstname") String firstname);

    @Query("SELECT p FROM Patient p WHERE LOWER(p.lastname) = LOWER(:lastname)")
    public List<Patient> findByLastname(@Param("lastname") String lastname);

    @Query("SELECT p FROM Patient p WHERE LOWER(p.firstname) = LOWER(:firstname)")
    public List<Patient> findByFirstname(@Param("firstname") String firstname);
}
