package org.example.service;

import org.example.model.Center;
import org.example.model.Specialist;
import org.example.repository.CenterRepository;
import org.example.repository.SpecialistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CenterServiceTest {

    @Mock
    private CenterRepository centerRepository;

    @Mock
    private SpecialistRepository specialistRepository;

    @InjectMocks
    private CenterService centerService;

    private Center testCenter;
    private Specialist testSpecialist;

    @BeforeEach
    void setUp() {
        testCenter = new Center();
        testCenter.setId(1L);
        testCenter.setName("Test Medical Center");
        testCenter.setCity("Test City");
        testCenter.setAddress("123 Test Street");
        testCenter.setPhone("0123456789");
        testCenter.setEmail("test@medicalcenter.com");

        testSpecialist = new Specialist();
        testSpecialist.setName("Dr. Test");
        testSpecialist.setSpecialty("Cardiology");
        testSpecialist.setEmail("doctor@test.com");
        testSpecialist.setPhone("9876543210");
        testSpecialist.setCenter(testCenter);
    }

    @Test
    void shouldFindAllCenters() {
        when(centerRepository.findAll()).thenReturn(Arrays.asList(testCenter));

        List<Center> centers = centerService.findAll();

        assertThat(centers).hasSize(1);
        assertThat(centers.get(0).getName()).isEqualTo("Test Medical Center");
        verify(centerRepository).findAll();
    }

    @Test
    void shouldCreateCenter() {
        when(centerRepository.save(any(Center.class))).thenReturn(testCenter);

        Center created = centerService.create(testCenter);

        assertThat(created).isNotNull();
        assertThat(created.getName()).isEqualTo("Test Medical Center");
        verify(centerRepository).save(testCenter);
    }

    @Test
    void shouldFindCentersByCity() {
        when(centerRepository.findByCityLike("Test City")).thenReturn(Arrays.asList(testCenter));

        List<Center> centers = centerService.findByCityLike("Test City");

        assertThat(centers).hasSize(1);
        assertThat(centers.get(0).getCity()).isEqualTo("Test City");
        verify(centerRepository).findByCityLike("Test City");
    }

    @Test
    void shouldFindCenterById() {
        when(centerRepository.findById(1L)).thenReturn(Optional.of(testCenter));

        Optional<Center> found = centerService.findById(1L);

        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Test Medical Center");
        verify(centerRepository).findById(1L);
    }

    @Test
    void shouldFindSpecialistsByCenterId() {
        when(centerRepository.findSpecialistsByCenterId(1L)).thenReturn(Arrays.asList(testSpecialist));

        List<Specialist> specialists = centerService.findSpecialistsByCenterId(1L);

        assertThat(specialists).hasSize(1);
        assertThat(specialists.get(0).getName()).isEqualTo("Dr. Test");
        verify(centerRepository).findSpecialistsByCenterId(1L);
    }
} 