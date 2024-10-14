package org.example.service;

import java.util.List;

import org.example.exception.PatientNotFoundException;
import org.example.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    public PatientRepository patientRepository;

    public List<Patient> findAll(String name){
        return patientRepository.findAll().stream()
                .filter(p -> p.getName().startsWith(name))
                .toList();
    }

    public Patient findOne(Integer id) throws PatientNotFoundException {
        return patientRepository.findById(Integer.valueOf(id))
                .orElseThrow(PatientNotFoundException::new);
    }

    public void create(Patient p) {
        patientRepository.save(p);
    }

    public void removeOne(Integer id) {
        patientRepository.deleteById(Integer.valueOf(id));
    }
}
