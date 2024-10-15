package org.example.service;

import java.util.List;

import org.example.exception.PatientNotFoundException;
import org.example.model.Patient;
import org.example.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    public PatientRepository patientRepository;

    public List<Patient> findAll(){
        return patientRepository.findAll();
    }

    public Patient findOne(Long id) throws PatientNotFoundException {
        return patientRepository.findById(Long.valueOf(id))
                .orElseThrow(PatientNotFoundException::new);
    }

    public void create(Patient p) {
        patientRepository.save(p);
    }

    public void removeOne(Long id) {
        patientRepository.deleteById(id);
    }
}
