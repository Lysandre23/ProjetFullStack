package org.example.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dto.SpecialistSignupRequest;
import org.example.model.Patient;
import org.example.model.Specialist;
import org.example.model.Center;
import org.example.service.AuthService;
import org.example.repository.CenterRepository;
import org.example.repository.PatientRepository;
import org.example.repository.SpecialistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CenterRepository centerRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private SpecialistRepository specialistRepository;

    @BeforeEach
    void setUp() {
        specialistRepository.deleteAll();
        patientRepository.deleteAll();
        centerRepository.deleteAll();
    }

    @Test
    void shouldSignUpPatient() throws Exception {
        Patient newPatient = new Patient();
        newPatient.setFirstname("Jane");
        newPatient.setLastname("Smith");
        newPatient.setEmail("jane.smith@test.com");
        newPatient.setPhone("9876543210");
        newPatient.setPassword("password456");
        newPatient.setBirthdate(new Date());

        mockMvc.perform(post("/api/auth/patient/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newPatient)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.firstname", is("Jane")))
                .andExpect(jsonPath("$.lastname", is("Smith")))
                .andExpect(jsonPath("$.email", is("jane.smith@test.com")))
                .andExpect(jsonPath("$.phone", is("9876543210")))
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void shouldSignInPatient() throws Exception {
        Patient newPatient = new Patient();
        newPatient.setFirstname("John");
        newPatient.setLastname("Doe");
        newPatient.setEmail("john.doe@test.com");
        newPatient.setPhone("1234567890");
        newPatient.setPassword("password123");
        newPatient.setBirthdate(new Date());

        mockMvc.perform(post("/api/auth/patient/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newPatient)))
                .andExpect(status().isCreated());

        Map<String, String> credentials = new HashMap<>();
        credentials.put("email", "john.doe@test.com");
        credentials.put("password", "password123");

        mockMvc.perform(post("/api/auth/patient/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(credentials)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstname", is("John")))
                .andExpect(jsonPath("$.lastname", is("Doe")))
                .andExpect(jsonPath("$.email", is("john.doe@test.com")))
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void shouldFailSignInWithWrongPassword() throws Exception {
        Patient newPatient = new Patient();
        newPatient.setFirstname("John");
        newPatient.setLastname("Doe");
        newPatient.setEmail("john.doe@test.com");
        newPatient.setPhone("1234567890");
        newPatient.setPassword("password123");
        newPatient.setBirthdate(new Date());

        mockMvc.perform(post("/api/auth/patient/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newPatient)))
                .andExpect(status().isCreated());

        Map<String, String> credentials = new HashMap<>();
        credentials.put("email", "john.doe@test.com");
        credentials.put("password", "wrongpassword");

        mockMvc.perform(post("/api/auth/patient/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(credentials)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid credentials"));
    }

    @Test
    void shouldFailSignUpWithExistingEmail() throws Exception {
        Patient existingPatient = new Patient();
        existingPatient.setFirstname("Jane");
        existingPatient.setLastname("Smith");
        existingPatient.setEmail("jane.smith@test.com");
        existingPatient.setPhone("9876543210");
        existingPatient.setPassword("password456");
        existingPatient.setBirthdate(new Date());

        mockMvc.perform(post("/api/auth/patient/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(existingPatient)))
                .andExpect(status().isCreated());

        // Try to signup with same email
        mockMvc.perform(post("/api/auth/patient/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(existingPatient)))
                .andExpect(status().isConflict())
                .andExpect(content().string("Email already exists"));
    }

    @Test
    void shouldSignUpSpecialist() throws Exception {
        Center center = new Center();
        center.setName("Test Medical Center");
        center.setCity("Test City");
        center.setAddress("123 Test Street");
        center.setPhone("0123456789");
        center.setEmail("test@medicalcenter.com");
        center = centerRepository.save(center);

        SpecialistSignupRequest request = new SpecialistSignupRequest();
        request.setName("Dr. Smith");
        request.setSpecialty("Cardiology");
        request.setEmail("dr.smith@test.com");
        request.setPhone("9876543210");
        request.setPassword("password123");
        request.setCenterId(center.getId());
        request.setAdmin(false);
        request.setSuperAdmin(false);

        mockMvc.perform(post("/api/auth/specialist/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.name", is("Dr. Smith")))
                .andExpect(jsonPath("$.specialty", is("Cardiology")))
                .andExpect(jsonPath("$.email", is("dr.smith@test.com")))
                .andExpect(jsonPath("$.phone", is("9876543210")))
                .andExpect(jsonPath("$.password").doesNotExist())
                .andExpect(jsonPath("$.center.id", is(center.getId().intValue())))
                .andExpect(jsonPath("$.center.name", is("Test Medical Center")));
    }

    @Test
    void shouldSignInSpecialist() throws Exception {
        // First create a center
        Center center = new Center();
        center.setName("Test Medical Center");
        center.setCity("Test City");
        center.setAddress("123 Test Street");
        center.setPhone("0123456789");
        center.setEmail("test@medicalcenter.com");
        center = centerRepository.save(center);

        // Create and signup specialist
        SpecialistSignupRequest request = new SpecialistSignupRequest();
        request.setName("Dr. Smith");
        request.setSpecialty("Cardiology");
        request.setEmail("dr.smith@test.com");
        request.setPhone("9876543210");
        request.setPassword("password123");
        request.setCenterId(center.getId());
        request.setAdmin(false);
        request.setSuperAdmin(false);

        mockMvc.perform(post("/api/auth/specialist/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        Map<String, String> credentials = new HashMap<>();
        credentials.put("email", "dr.smith@test.com");
        credentials.put("password", "password123");

        mockMvc.perform(post("/api/auth/specialist/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(credentials)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Dr. Smith")))
                .andExpect(jsonPath("$.specialty", is("Cardiology")))
                .andExpect(jsonPath("$.email", is("dr.smith@test.com")))
                .andExpect(jsonPath("$.password").doesNotExist()); // Password should not be in response
    }

    @Test
    void shouldFailSignUpSpecialistWithNonExistentCenter() throws Exception {
        SpecialistSignupRequest request = new SpecialistSignupRequest();
        request.setName("Dr. Smith");
        request.setSpecialty("Cardiology");
        request.setEmail("dr.smith@test.com");
        request.setPhone("9876543210");
        request.setPassword("password123");
        request.setCenterId(999L);

        mockMvc.perform(post("/api/auth/specialist/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Center not found with id: 999"));
    }

    @Test
    void shouldFailSignInSpecialistWithWrongPassword() throws Exception {
        Center center = new Center();
        center.setName("Test Medical Center");
        center.setCity("Test City");
        center.setAddress("123 Test Street");
        center.setPhone("0123456789");
        center.setEmail("test@medicalcenter.com");
        center = centerRepository.save(center);

        SpecialistSignupRequest request = new SpecialistSignupRequest();
        request.setName("Dr. Smith");
        request.setSpecialty("Cardiology");
        request.setEmail("dr.smith@test.com");
        request.setPhone("9876543210");
        request.setPassword("password123");
        request.setCenterId(center.getId());
        request.setAdmin(false);
        request.setSuperAdmin(false);

        mockMvc.perform(post("/api/auth/specialist/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        Map<String, String> credentials = new HashMap<>();
        credentials.put("email", "dr.smith@test.com");
        credentials.put("password", "wrongpassword");

        mockMvc.perform(post("/api/auth/specialist/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(credentials)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid credentials"));
    }
} 