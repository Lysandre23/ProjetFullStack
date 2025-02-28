package org.example.service;

import org.example.exception.PatientNotFoundException;
import org.example.model.Patient;
import org.example.model.Reservation;
import org.example.repository.PatientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientService patientService;

    private Patient testPatient;
    private Reservation testReservation;

    @BeforeEach
    void setUp() {
        testPatient = new Patient();
        testPatient.setId(1L);
        testPatient.setFirstname("John");
        testPatient.setLastname("Doe");
        testPatient.setEmail("john.doe@test.com");
        testPatient.setPhone("0123456789");
        testPatient.setPassword("password123");
        testPatient.setBirthdate(new Date());
    }

    @Test
    void shouldFindAllPatients() {
        when(patientRepository.findAll()).thenReturn(Arrays.asList(testPatient));

        List<Patient> patients = patientService.findAll();

        assertThat(patients).hasSize(1);
        assertThat(patients.get(0).getFirstname()).isEqualTo("John");
        assertThat(patients.get(0).getLastname()).isEqualTo("Doe");
        verify(patientRepository).findAll();
    }

    @Test
    void shouldFindPatientById() {
        when(patientRepository.findById(1L)).thenReturn(Optional.of(testPatient));

        Optional<Patient> found = patientService.findById(1L);

        assertThat(found).isPresent();
        assertThat(found.get().getFirstname()).isEqualTo("John");
        assertThat(found.get().getLastname()).isEqualTo("Doe");
        verify(patientRepository).findById(1L);
    }

    @Test
    void shouldFindOnePatient() {
        when(patientRepository.findById(1L)).thenReturn(Optional.of(testPatient));

        Patient found = patientService.findOne(1L);

        assertThat(found).isNotNull();
        assertThat(found.getFirstname()).isEqualTo("John");
        assertThat(found.getLastname()).isEqualTo("Doe");
        verify(patientRepository).findById(1L);
    }

    @Test
    void shouldThrowExceptionWhenPatientNotFound() {
        when(patientRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> patientService.findOne(999L))
                .isInstanceOf(PatientNotFoundException.class)
                .hasMessageContaining("Patient not found with id: 999");
    }

    @Test
    void shouldSavePatient() {
        when(patientRepository.save(any(Patient.class))).thenReturn(testPatient);

        Patient saved = patientService.save(testPatient);

        assertThat(saved).isNotNull();
        assertThat(saved.getFirstname()).isEqualTo("John");
        assertThat(saved.getLastname()).isEqualTo("Doe");
        verify(patientRepository).save(testPatient);
    }

    @Test
    void shouldDeletePatient() {
        doNothing().when(patientRepository).deleteById(1L);

        patientService.deleteById(1L);

        verify(patientRepository).deleteById(1L);
    }

    @Test
    void shouldFindPatientsByLastname() {
        when(patientRepository.findByLastname("Doe")).thenReturn(Arrays.asList(testPatient));

        List<Patient> patients = patientService.findByLastname("Doe");

        assertThat(patients).hasSize(1);
        assertThat(patients.get(0).getLastname()).isEqualTo("Doe");
        verify(patientRepository).findByLastname("Doe");
    }

    @Test
    void shouldFindPatientsByFirstname() {
        when(patientRepository.findByFirstname("John")).thenReturn(Arrays.asList(testPatient));

        List<Patient> patients = patientService.findByFirstname("John");

        assertThat(patients).hasSize(1);
        assertThat(patients.get(0).getFirstname()).isEqualTo("John");
        verify(patientRepository).findByFirstname("John");
    }

    @Test
    void shouldFindPatientsByFirstnameAndLastname() {
        when(patientRepository.findByLastnameAndFirstname("Doe", "John"))
                .thenReturn(Arrays.asList(testPatient));

        List<Patient> patients = patientService.findByLastnameAndFirstname("Doe", "John");

        assertThat(patients).hasSize(1);
        assertThat(patients.get(0).getFirstname()).isEqualTo("John");
        assertThat(patients.get(0).getLastname()).isEqualTo("Doe");
        verify(patientRepository).findByLastnameAndFirstname("Doe", "John");
    }

    @Test
    void shouldCheckIfPatientExists() {
        when(patientRepository.existsById(1L)).thenReturn(true);
        when(patientRepository.existsById(999L)).thenReturn(false);

        assertThat(patientService.existsById(1L)).isTrue();
        assertThat(patientService.existsById(999L)).isFalse();

        verify(patientRepository).existsById(1L);
        verify(patientRepository).existsById(999L);
    }
} 