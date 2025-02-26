package org.example.rest;

import org.example.model.Admin;
import org.example.repository.AdminRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AdminRestControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AdminRepository adminRepository;

    @BeforeEach
    void setUp() {
        adminRepository.deleteAll();
        
        adminRepository.save(new Admin(null, "Admin 1", true, 1));
        adminRepository.save(new Admin(null, "Admin 2", false, 2));
    }

    @Test
    void shouldReturnListOfAdmins() throws Exception {
        mockMvc.perform(get("/api/admins"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void shouldReturnListOfSuperAdmins() throws Exception {
        mockMvc.perform(get("/api/admins/super"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void shouldCreateAdmin() throws Exception {
        String adminJson = "{\"name\":\"Admin 3\",\"isSuperAdmin\":false,\"centerid\":3}";
        
        mockMvc.perform(post("/api/admins")
                .contentType(MediaType.APPLICATION_JSON)
                .content(adminJson))
                .andExpect(status().isCreated());
    }
}