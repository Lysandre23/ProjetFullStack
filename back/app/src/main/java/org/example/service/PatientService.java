package org.example.service;

import org.example.exception.PatientNotFoundException;
import org.example.model.Patient;
import org.example.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    public Optional<Patient> findById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient findOne(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));
    }

    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

    public void deleteById(Long id) {
        patientRepository.deleteById(id);
    }

    public List<Patient> findByLastname(String lastname) {
        return patientRepository.findByLastname(lastname);
    }

    public List<Patient> findByFirstname(String firstname) {
        return patientRepository.findByFirstname(firstname);
    }

    public List<Patient> findByLastnameAndFirstname(String lastname, String firstname) {
        return patientRepository.findByLastnameAndFirstname(lastname, firstname);
    }

    public boolean existsById(Long id) {
        return patientRepository.existsById(id);
    }
}
