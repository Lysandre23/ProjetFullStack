package org.example.repository;

import org.example.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByLastname(String lastname);
    List<Patient> findByFirstname(String firstname);
    List<Patient> findByLastnameAndFirstname(String lastname, String firstname);
    Optional<Patient> findByEmail(String email);
}
