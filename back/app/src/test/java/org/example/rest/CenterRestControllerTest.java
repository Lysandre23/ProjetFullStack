package org.example.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.model.Center;
import org.example.model.Specialist;
import org.example.repository.CenterRepository;
import org.example.repository.SpecialistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CenterRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CenterRepository centerRepository;

    @Autowired
    private SpecialistRepository specialistRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Center testCenter;
    private Specialist testSpecialist;

    @BeforeEach
    void setUp() {
        // Clean up the repositories
        specialistRepository.deleteAll();
        centerRepository.deleteAll();

        // Create and save test center first
        testCenter = new Center();
        testCenter.setName("Test Medical Center");
        testCenter.setCity("Test City");
        testCenter.setAddress("123 Test Street");
        testCenter.setPhone("0123456789");
        testCenter.setEmail("test@medicalcenter.com");
        
        // Save the center and update the reference
        testCenter = centerRepository.save(testCenter);

        // Now create and save the specialist with the saved center
        testSpecialist = new Specialist();
        testSpecialist.setName("Dr. Test");
        testSpecialist.setSpecialty("Cardiology");
        testSpecialist.setEmail("doctor@test.com");
        testSpecialist.setPhone("9876543210");
        testSpecialist.setCenter(testCenter); // This now has a valid center with ID
        
        testSpecialist = specialistRepository.save(testSpecialist);
    }

    @Test
    void shouldReturnAllCenters() throws Exception {
        mockMvc.perform(get("/api/centers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].name", is("Test Medical Center")))
                .andExpect(jsonPath("$[0].city", is("Test City")));
    }

    @Test
    void shouldCreateCenter() throws Exception {
        Center newCenter = new Center();
        newCenter.setName("New Medical Center");
        newCenter.setCity("New City");
        newCenter.setAddress("456 New Street");
        newCenter.setPhone("9876543210");
        newCenter.setEmail("new@medicalcenter.com");

        mockMvc.perform(post("/api/centers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newCenter)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"));
    }

    @Test
    void shouldFindCenterById() throws Exception {
        mockMvc.perform(get("/api/centers/" + testCenter.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Test Medical Center")))
                .andExpect(jsonPath("$.city", is("Test City")));
    }

    @Test
    void shouldFindCentersByCity() throws Exception {
        mockMvc.perform(get("/api/centers/city/Test City"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].city", is("Test City")));
    }

    @Test
    void shouldUpdateCenter() throws Exception {
        testCenter.setName("Updated Medical Center");
        
        mockMvc.perform(put("/api/centers/" + testCenter.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testCenter)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Updated Medical Center")));
    }

    @Test
    void shouldDeleteCenter() throws Exception {
        mockMvc.perform(delete("/api/centers/" + testCenter.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/centers/" + testCenter.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldGetCenterSpecialists() throws Exception {
        mockMvc.perform(get("/api/centers/" + testCenter.getId() + "/specialists"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].name", is("Dr. Test")))
                .andExpect(jsonPath("$[0].specialty", is("Cardiology")));
    }

    @Test
    void shouldAddSpecialistToCenter() throws Exception {
        Specialist newSpecialist = new Specialist();
        newSpecialist.setName("Dr. New");
        newSpecialist.setSpecialty("Pediatrics");
        newSpecialist.setEmail("new.doctor@test.com");
        newSpecialist.setPhone("5555555555");

        mockMvc.perform(post("/api/centers/" + testCenter.getId() + "/specialists")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newSpecialist)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"));
    }

    @Test
    void shouldReturn404WhenCenterNotFound() throws Exception {
        mockMvc.perform(get("/api/centers/999999"))
                .andExpect(status().isNotFound());
    }
} 