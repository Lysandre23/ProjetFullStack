package org.example.service;

import org.example.model.Patient;
import org.example.model.Specialist;
import org.example.repository.PatientRepository;
import org.example.repository.SpecialistRepository;
import org.example.repository.CenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    private final PatientRepository patientRepository;
    private final SpecialistRepository specialistRepository;
    private final CenterRepository centerRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(
            PatientRepository patientRepository,
            SpecialistRepository specialistRepository,
            CenterRepository centerRepository,
            PasswordEncoder passwordEncoder) {
        this.patientRepository = patientRepository;
        this.specialistRepository = specialistRepository;
        this.centerRepository = centerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Patient signUpPatient(Patient patient) {
        if (patientRepository.findByEmail(patient.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        return patientRepository.save(patient);
    }

    public Specialist signUpSpecialist(Specialist specialist) {
        if (specialistRepository.findByEmail(specialist.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        if (specialist.getCenter() == null || specialist.getCenter().getId() == null) {
            throw new RuntimeException("Specialist must be associated with a center");
        }

        if (!centerRepository.existsById(specialist.getCenter().getId())) {
            throw new RuntimeException("Center not found with id: " + specialist.getCenter().getId());
        }
        
        specialist.setPassword(passwordEncoder.encode(specialist.getPassword()));
        return specialistRepository.save(specialist);
    }

    public Patient signInPatient(String email, String password) {
        return patientRepository.findByEmail(email)
                .filter(patient -> passwordEncoder.matches(password, patient.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }

    public Specialist signInSpecialist(String email, String password) {
        return specialistRepository.findByEmail(email)
                .filter(specialist -> passwordEncoder.matches(password, specialist.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
} 