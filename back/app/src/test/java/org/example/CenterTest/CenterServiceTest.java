package org.example.CenterTest;

import org.example.repository.CenterRepository;
import org.example.service.CenterService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;

public class CenterServiceTest {

    CenterService centerService;
    CenterRepository centerRepository;

    @BeforeEach
    void setUp() {
        centerRepository = Mockito.mock(CenterRepository.class);
        centerService = new CenterService(centerRepository);
    }

}
