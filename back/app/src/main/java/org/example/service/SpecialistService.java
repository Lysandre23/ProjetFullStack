package org.example.service;

import org.example.model.Reservation;
import org.example.model.Specialist;
import org.example.repository.SpecialistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecialistService {

    @Autowired
    public SpecialistRepository specialistRepository;

    public List<Specialist> findAll() {
        return specialistRepository.findAll();
    }

    public List<Specialist> findBySpecialty(String specialty) {
        return specialistRepository.findBySpecialty(specialty);
    }

    public void create(Specialist specialist) { specialistRepository.save(specialist); }

    public void removeOne(Integer id) { specialistRepository.deleteById(id); }

    public List<Reservation> getReservationsBySpecialistId(Integer id) {
        return specialistRepository.findById(id)
                .map(Specialist::getReservations)
                .orElseThrow(() -> new RuntimeException("Specialist not found"));
    }

    public Optional<Specialist> findById(Integer id) {
        return specialistRepository.findById(id);
    }

    public List<Specialist> findAllAdmins() {
        return specialistRepository.findByIsAdminTrue();
    }

    public List<Specialist> findAllSuperAdmins() {
        return specialistRepository.findByIsSuperAdminTrue();
    }

    public void promoteToAdmin(Integer id) {
        specialistRepository.findById(id).ifPresent(specialist -> {
            specialist.setAdmin(true);
            specialistRepository.save(specialist);
        });
    }

    public void promoteToSuperAdmin(Integer id) {
        specialistRepository.findById(id).ifPresent(specialist -> {
            specialist.setSuperAdmin(true);
            specialistRepository.save(specialist);
        });
    }

    public void demoteFromAdmin(Integer id) {
        specialistRepository.findById(id).ifPresent(specialist -> {
            if (!specialist.isSuperAdmin()) {
                specialist.setAdmin(false);
                specialistRepository.save(specialist);
            }
        });
    }

    public void demoteFromSuperAdmin(Integer id) {
        specialistRepository.findById(id).ifPresent(specialist -> {
            specialist.setSuperAdmin(false);
            specialistRepository.save(specialist);
        });
    }
}
