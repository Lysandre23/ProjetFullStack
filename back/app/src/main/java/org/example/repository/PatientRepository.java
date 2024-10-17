package org.example.repository;

import org.example.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    public List<Patient> findByLastnameAndFirstname(String lastname, String firstname);
    public List<Patient> findByLastname(String lastname);
    public List<Patient> findByFirstname(String firstname);
}
