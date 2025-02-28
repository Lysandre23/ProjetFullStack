package org.example.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.model.Center;
import org.example.model.Specialist;
import org.example.repository.SpecialistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SpecialistRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SpecialistRepository specialistRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Center testCenter;
    private Specialist testSpecialist;

    @BeforeEach
    void setUp() {
        specialistRepository.deleteAll();

        testCenter = new Center();
        testCenter.setId(1);
        testCenter.setName("Test Center");
        testCenter.setCity("Test City");
        testCenter.setAddress("Test Address");
        testCenter.setPhone("0123456789");
        testCenter.setEmail("test@center.com");

        testSpecialist = new Specialist();
        testSpecialist.setName("Dr. Test");
        testSpecialist.setSpecialty("Cardiology");
        testSpecialist.setEmail("doctor@test.com");
        testSpecialist.setPhone("9876543210");
        testSpecialist.setPassword("password123");
        testSpecialist.setCenter(testCenter);
        
        specialistRepository.save(testSpecialist);
    }

    @Test
    void shouldReturnAllSpecialists() throws Exception {
        mockMvc.perform(get("/api/specialists"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].name", is("Dr. Test")))
                .andExpect(jsonPath("$[0].specialty", is("Cardiology")));
    }

    @Test
    void shouldCreateSpecialist() throws Exception {
        Specialist newSpecialist = new Specialist();
        newSpecialist.setName("Dr. New");
        newSpecialist.setSpecialty("Pediatrics");
        newSpecialist.setEmail("new@doctor.com");
        newSpecialist.setPhone("1122334455");
        newSpecialist.setPassword("newpass123");
        newSpecialist.setCenter(testCenter);

        mockMvc.perform(post("/api/specialists")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newSpecialist)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"));
    }

    @Test
    void shouldFindBySpecialty() throws Exception {
        mockMvc.perform(get("/api/specialists/specialty/Cardiology"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].specialty", is("Cardiology")));
    }

    @Test
    void shouldPromoteToAdmin() throws Exception {
        mockMvc.perform(put("/api/specialists/" + testSpecialist.getId() + "/promote/admin"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/specialists/admins"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].id", is(testSpecialist.getId())));
    }

    @Test
    void shouldPromoteToSuperAdmin() throws Exception {
        mockMvc.perform(put("/api/specialists/" + testSpecialist.getId() + "/promote/superadmin"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/specialists/superadmins"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].id", is(testSpecialist.getId())));
    }

    @Test
    void shouldGetSpecialistReservations() throws Exception {
        mockMvc.perform(get("/api/specialists/" + testSpecialist.getId() + "/reservations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(0))));
    }
} 