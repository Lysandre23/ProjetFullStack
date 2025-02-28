package org.example.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.model.Patient;
import org.example.model.Reservation;
import org.example.model.Specialist;
import org.example.repository.PatientRepository;
import org.example.repository.ReservationRepository;
import org.example.repository.SpecialistRepository;
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
class ReservationRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private SpecialistRepository specialistRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Patient testPatient;
    private Specialist testSpecialist;
    private Reservation testReservation;

    @BeforeEach
    void setUp() {
        reservationRepository.deleteAll();
        specialistRepository.deleteAll();
        patientRepository.deleteAll();

        testPatient = new Patient();
        testPatient.setFirstname("John");
        testPatient.setLastname("Doe");
        testPatient.setEmail("john.doe@test.com");
        testPatient.setPhone("0123456789");
        testPatient = patientRepository.save(testPatient);

        testSpecialist = new Specialist();
        testSpecialist.setName("Dr. Smith");
        testSpecialist.setSpecialty("Cardiology");
        testSpecialist.setEmail("dr.smith@test.com");
        testSpecialist.setPhone("9876543210");
        testSpecialist = specialistRepository.save(testSpecialist);

        testReservation = new Reservation();
        testReservation.setDate(new Date());
        testReservation.setPatient(testPatient);
        testReservation.setSpecialist(testSpecialist);
        testReservation = reservationRepository.save(testReservation);
    }

    @Test
    void shouldReturnAllReservations() throws Exception {
        mockMvc.perform(get("/api/reservations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].patient.firstname", is("John")))
                .andExpect(jsonPath("$[0].specialist.name", is("Dr. Smith")));
    }

    @Test
    void shouldCreateReservation() throws Exception {
        Reservation newReservation = new Reservation();
        newReservation.setDate(new Date());
        newReservation.setPatient(testPatient);
        newReservation.setSpecialist(testSpecialist);

        mockMvc.perform(post("/api/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newReservation)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"));
    }

    @Test
    void shouldFindSpecialistByReservationId() throws Exception {
        mockMvc.perform(get("/api/reservations/{id}/specialist", testReservation.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Dr. Smith")))
                .andExpect(jsonPath("$.specialty", is("Cardiology")));
    }

    @Test
    void shouldDeleteReservation() throws Exception {
        mockMvc.perform(delete("/api/reservations/{id}", testReservation.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/reservations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void shouldReturn404WhenSpecialistNotFoundForReservation() throws Exception {
        mockMvc.perform(get("/api/reservations/{id}/specialist", 999))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturn400WhenCreatingInvalidReservation() throws Exception {
        Reservation invalidReservation = new Reservation();

        mockMvc.perform(post("/api/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidReservation)))
                .andExpect(status().isBadRequest());
    }
} 