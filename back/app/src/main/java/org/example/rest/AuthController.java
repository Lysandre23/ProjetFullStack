package org.example.rest;

import org.example.dto.PatientDTO;
import org.example.dto.SpecialistDTO;
import org.example.dto.SpecialistSignupRequest;
import org.example.model.Center;
import org.example.model.Patient;
import org.example.model.Specialist;
import org.example.service.AuthService;
import org.example.repository.CenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private CenterRepository centerRepository;

    @PostMapping("/patient/signup")
    public ResponseEntity<?> signUpPatient(@RequestBody Patient patient) throws URISyntaxException {
        try {
            Patient savedPatient = authService.signUpPatient(patient);
            PatientDTO dto = PatientDTO.fromPatient(savedPatient);
            return ResponseEntity
                    .created(new URI("/api/patients/" + dto.getId()))
                    .body(dto);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Email already exists")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
            throw e;
        }
    }

    @PostMapping("/specialist/signup")
    public ResponseEntity<?> signUpSpecialist(@RequestBody SpecialistSignupRequest request) throws URISyntaxException {
        try {
            // Convert request to Specialist entity
            Specialist specialist = new Specialist();
            specialist.setFirstname(request.getFirstname());
            specialist.setLastname(request.getLastname());
            specialist.setSpecialty(request.getSpecialty());
            specialist.setEmail(request.getEmail());
            specialist.setPassword(request.getPassword());
            specialist.setPhone(request.getPhone());
            specialist.setAdmin(request.isAdmin());
            specialist.setSuperAdmin(request.isSuperAdmin());

            // Find and set the center
            Center center = centerRepository.findById(request.getCenterId())
                .orElseThrow(() -> new RuntimeException("Center not found with id: " + request.getCenterId()));
            specialist.setCenter(center);

            Specialist savedSpecialist = authService.signUpSpecialist(specialist);
            SpecialistDTO dto = SpecialistDTO.fromSpecialist(savedSpecialist);
            return ResponseEntity
                    .created(new URI("/api/specialists/" + dto.getId()))
                    .body(dto);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Email already exists")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
            if (e.getMessage().equals("Specialist must be associated with a center")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
            if (e.getMessage().startsWith("Center not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
            throw e;
        }
    }

    @PostMapping("/patient/signin")
    public ResponseEntity<?> signInPatient(@RequestBody Map<String, String> credentials) {
        try {
            Patient patient = authService.signInPatient(credentials.get("email"), credentials.get("password"));
            PatientDTO dto = PatientDTO.fromPatient(patient);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Invalid credentials")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
            }
            throw e;
        }
    }

    @PostMapping("/specialist/signin")
    public ResponseEntity<?> signInSpecialist(@RequestBody Map<String, String> credentials) {
        try {
            Specialist specialist = authService.signInSpecialist(credentials.get("email"), credentials.get("password"));
            SpecialistDTO dto = SpecialistDTO.fromSpecialist(specialist);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Invalid credentials")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
            }
            throw e;
        }
    }
} 