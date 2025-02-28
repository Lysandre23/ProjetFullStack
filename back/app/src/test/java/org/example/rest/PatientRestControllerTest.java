package org.example.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.model.Patient;
import org.example.model.Reservation;
import org.example.repository.PatientRepository;
import org.example.repository.ReservationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PatientRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Patient testPatient;

    @BeforeEach
    void setUp() {
        // Clean up the repositories in correct order
        reservationRepository.deleteAll();
        patientRepository.deleteAll();

        // Create and save test patient
        testPatient = new Patient();
        testPatient.setFirstname("John");
        testPatient.setLastname("Doe");
        testPatient.setEmail("john.doe@test.com");
        testPatient.setPhone("0123456789");
        testPatient.setPassword("password123");
        testPatient.setBirthdate(new Date());
        
        testPatient = patientRepository.save(testPatient);
    }

    @Test
    void shouldReturnAllPatients() throws Exception {
        mockMvc.perform(get("/api/patients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].firstname", is("John")))
                .andExpect(jsonPath("$[0].lastname", is("Doe")));
    }

    @Test
    void shouldFindPatientById() throws Exception {
        mockMvc.perform(get("/api/patients/" + testPatient.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstname", is("John")))
                .andExpect(jsonPath("$.lastname", is("Doe")));
    }

    @Test
    void shouldFindPatientsByLastName() throws Exception {
        mockMvc.perform(get("/api/patients/search/lastname/Doe"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].lastname", is("Doe")));
    }

    @Test
    void shouldFindPatientsByFirstName() throws Exception {
        mockMvc.perform(get("/api/patients/search/firstname/John"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].firstname", is("John")));
    }

    @Test
    void shouldUpdatePatient() throws Exception {
        testPatient.setFirstname("Johnny");
        
        mockMvc.perform(put("/api/patients/" + testPatient.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testPatient)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstname", is("Johnny")));
    }

    @Test
    void shouldDeletePatient() throws Exception {
        mockMvc.perform(delete("/api/patients/" + testPatient.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/patients/" + testPatient.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldGetPatientReservations() throws Exception {
        mockMvc.perform(get("/api/patients/" + testPatient.getId() + "/reservations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(0))));
    }

    @Test
    void shouldReturn404WhenPatientNotFound() throws Exception {
        mockMvc.perform(get("/api/patients/999999"))
                .andExpect(status().isNotFound());
    }
} 