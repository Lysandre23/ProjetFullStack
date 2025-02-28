package org.example.service;

import org.example.model.Center;
import org.example.model.Specialist;
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
class SpecialistServiceTest {

    @Mock
    private SpecialistRepository specialistRepository;

    @InjectMocks
    private SpecialistService specialistService;

    private Specialist testSpecialist;
    private Center testCenter;

    @BeforeEach
    void setUp() {
        testCenter = new Center();
        testCenter.setId(1L);
        testCenter.setName("Test Center");

        testSpecialist = new Specialist();
        testSpecialist.setName("Dr. Test");
        testSpecialist.setSpecialty("Cardiology");
        testSpecialist.setCenter(testCenter);
    }

    @Test
    void shouldFindAllSpecialists() {
        when(specialistRepository.findAll()).thenReturn(Arrays.asList(testSpecialist));

        List<Specialist> specialists = specialistService.findAll();

        assertThat(specialists).hasSize(1);
        assertThat(specialists.get(0).getName()).isEqualTo("Dr. Test");
        verify(specialistRepository).findAll();
    }

    @Test
    void shouldFindBySpecialty() {
        when(specialistRepository.findBySpecialty("Cardiology"))
                .thenReturn(Arrays.asList(testSpecialist));

        List<Specialist> specialists = specialistService.findBySpecialty("Cardiology");

        assertThat(specialists).hasSize(1);
        assertThat(specialists.get(0).getSpecialty()).isEqualTo("Cardiology");
        verify(specialistRepository).findBySpecialty("Cardiology");
    }

    @Test
    void shouldCreateSpecialist() {
        testSpecialist.setAdmin(true);
        testSpecialist.setSuperAdmin(true);
        when(specialistRepository.save(any(Specialist.class))).thenReturn(testSpecialist);

        Specialist created = specialistService.create(testSpecialist);

        assertThat(created.isAdmin()).isTrue();
        assertThat(created.isSuperAdmin()).isTrue();
        verify(specialistRepository).save(testSpecialist);
    }

    @Test
    void shouldFindById() {
        when(specialistRepository.findById(1L)).thenReturn(Optional.of(testSpecialist));

        Optional<Specialist> found = specialistService.findById(1L);

        assertThat(found).isPresent();
        assertThat(found.get()).isEqualTo(testSpecialist);
        verify(specialistRepository).findById(1L);
    }

    @Test
    void shouldFindAllAdmins() {
        testSpecialist.setAdmin(true);
        when(specialistRepository.findByAdminTrue()).thenReturn(Arrays.asList(testSpecialist));

        List<Specialist> admins = specialistService.findAllAdmins();

        assertThat(admins).hasSize(1);
        assertThat(admins.get(0).isAdmin()).isTrue();
        verify(specialistRepository).findByAdminTrue();
    }

    @Test
    void shouldFindAllSuperAdmins() {
        testSpecialist.setSuperAdmin(true);
        when(specialistRepository.findBySuperAdminTrue()).thenReturn(Arrays.asList(testSpecialist));

        List<Specialist> superAdmins = specialistService.findAllSuperAdmins();

        assertThat(superAdmins).hasSize(1);
        assertThat(superAdmins.get(0).isSuperAdmin()).isTrue();
        verify(specialistRepository).findBySuperAdminTrue();
    }

    @Test
    void shouldPromoteToAdmin() {
        when(specialistRepository.findById(1L)).thenReturn(Optional.of(testSpecialist));
        when(specialistRepository.save(any(Specialist.class))).thenReturn(testSpecialist);

        specialistService.promoteToAdmin(1L);

        assertThat(testSpecialist.isAdmin()).isTrue();
        verify(specialistRepository).save(testSpecialist);
    }

    @Test
    void shouldPromoteToSuperAdmin() {
        when(specialistRepository.findById(1L)).thenReturn(Optional.of(testSpecialist));
        when(specialistRepository.save(any(Specialist.class))).thenReturn(testSpecialist);

        specialistService.promoteToSuperAdmin(1L);

        assertThat(testSpecialist.isSuperAdmin()).isTrue();
        assertThat(testSpecialist.isAdmin()).isTrue(); // SuperAdmin is also an admin
        verify(specialistRepository).save(testSpecialist);
    }
} 