package org.example.service;

import org.example.model.Patient;
import org.example.model.Reservation;
import org.example.model.Specialist;
import org.example.repository.ReservationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private ReservationService reservationService;

    private Reservation testReservation;
    private Patient testPatient;
    private Specialist testSpecialist;

    @BeforeEach
    void setUp() throws Exception {
        // Create test patient
        testPatient = new Patient();
        testPatient.setId(1L);
        testPatient.setFirstname("John");
        testPatient.setLastname("Doe");
        testPatient.setEmail("john.doe@test.com");
        testPatient.setPhone("0123456789");

        // Create test specialist and set ID using reflection
        testSpecialist = new Specialist();
        Field idField = Specialist.class.getDeclaredField("id");
        idField.setAccessible(true);
        idField.set(testSpecialist, 1L);
        testSpecialist.setName("Dr. Smith");
        testSpecialist.setSpecialty("Cardiology");
        testSpecialist.setEmail("dr.smith@test.com");
        testSpecialist.setPhone("9876543210");

        // Create test reservation
        testReservation = new Reservation();
        testReservation.setId(1);
        testReservation.setDate(new Date());
        testReservation.setPatient(testPatient);
        testReservation.setSpecialist(testSpecialist);
    }

    @Test
    void shouldFindAllReservations() {
        when(reservationRepository.findAll()).thenReturn(Arrays.asList(testReservation));

        List<Reservation> reservations = reservationService.findAll();

        assertThat(reservations).hasSize(1);
        assertThat(reservations.get(0).getPatient().getFirstname()).isEqualTo("John");
        assertThat(reservations.get(0).getSpecialist().getName()).isEqualTo("Dr. Smith");
        verify(reservationRepository).findAll();
    }

    @Test
    void shouldCreateReservation() {
        when(reservationRepository.save(any(Reservation.class))).thenReturn(testReservation);

        Reservation created = reservationService.create(testReservation);

        assertThat(created).isNotNull();
        assertThat(created.getPatient().getFirstname()).isEqualTo("John");
        assertThat(created.getSpecialist().getName()).isEqualTo("Dr. Smith");
        verify(reservationRepository).save(testReservation);
    }

    @Test
    void shouldFindReservationById() {
        when(reservationRepository.findById(1)).thenReturn(Optional.of(testReservation));

        Optional<Reservation> found = reservationService.findById(1);

        assertThat(found).isPresent();
        assertThat(found.get().getPatient().getFirstname()).isEqualTo("John");
        assertThat(found.get().getSpecialist().getName()).isEqualTo("Dr. Smith");
        verify(reservationRepository).findById(1);
    }

    @Test
    void shouldDeleteReservation() {
        doNothing().when(reservationRepository).deleteById(1);

        reservationService.removeOne(1);

        verify(reservationRepository).deleteById(1);
    }

    @Test
    void shouldFindSpecialistByReservationId() {
        when(reservationRepository.findSpecialist(1)).thenReturn(testSpecialist);

        Specialist specialist = reservationService.findSpecialistByReservationId(1);

        assertThat(specialist).isNotNull();
        assertThat(specialist.getName()).isEqualTo("Dr. Smith");
        assertThat(specialist.getSpecialty()).isEqualTo("Cardiology");
        verify(reservationRepository).findSpecialist(1);
    }

    @Test
    void shouldFindReservationsByPatientId() {
        when(reservationRepository.findByPatientId(1L)).thenReturn(Arrays.asList(testReservation));

        List<Reservation> reservations = reservationService.findByPatientId(1L);

        assertThat(reservations).hasSize(1);
        assertThat(reservations.get(0).getPatient().getId()).isEqualTo(1L);
        verify(reservationRepository).findByPatientId(1L);
    }

    @Test
    void shouldFindReservationsBySpecialistId() {
        when(reservationRepository.findBySpecialistId(1L)).thenReturn(Arrays.asList(testReservation));

        List<Reservation> reservations = reservationService.findBySpecialistId(1L);

        assertThat(reservations).hasSize(1);
        assertThat(reservations.get(0).getSpecialist().getId()).isEqualTo(1L);
        verify(reservationRepository).findBySpecialistId(1L);
    }

    @Test
    void shouldUpdateReservation() {
        when(reservationRepository.findById(1)).thenReturn(Optional.of(testReservation));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(testReservation);

        Date newDate = new Date();
        testReservation.setDate(newDate);

        Reservation updated = reservationService.update(1, testReservation);

        assertThat(updated).isNotNull();
        assertThat(updated.getDate()).isEqualTo(newDate);
        verify(reservationRepository).findById(1);
        verify(reservationRepository).save(testReservation);
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentReservation() {
        when(reservationRepository.findById(999)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> reservationService.update(999, testReservation))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Reservation not found");
    }
} 