package org.example.rest;

import org.example.model.Center;
import org.example.repository.CenterRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class CenterRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CenterRepository centerRepository;

    @BeforeEach
    //
    void setUp() {
        centerRepository.deleteAll();

        centerRepository.save(new Center(null, "Centre 1", "Nancy", "", "123456789", "centre1@email.com", 1));
        centerRepository.save(new Center(null, "Centre 2", "Nancy", "", "987654321", "centre2@email.com", 2));
    }

    @Test
    void shouldReturnListOfCenters() throws Exception {
        mockMvc.perform(get("/api/centers")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Centre 1"))
                .andExpect(jsonPath("$[1].city").value("Nancy"));
    }
}