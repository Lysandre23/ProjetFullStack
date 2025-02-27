package org.example.service;

import org.example.model.Center;
import org.example.model.Specialist;
import org.example.repository.CenterRepository;
import org.example.repository.SpecialistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CenterService {
    private final CenterRepository centerRepository;
    private final SpecialistRepository specialistRepository;

    public CenterService(CenterRepository centerRepository, SpecialistRepository specialistRepository) {
        this.centerRepository = centerRepository;
        this.specialistRepository = specialistRepository;
    }

    public List<Center> findAll() {
        return centerRepository.findAll();
    }

    public void create(Center center) {
        centerRepository.save(center);
    }

    public List<Center> findByCityLike(String city) {
        return centerRepository.findByCityLike(city);
    }

    public Specialist addSpecialistToCenter(int centerId, Specialist specialist) {
        Center center = centerRepository.findById(centerId)
                .orElseThrow(() -> new RuntimeException(""));
        specialist.setCenter(center);
        return specialistRepository.save(specialist);
    }

    public void removeSpecialistFromCenter(int centerId, int specialistId) {
        Specialist specialist = specialistRepository.findById(specialistId)
                .orElseThrow(() -> new RuntimeException("Spécialiste introuvable"));
        if (!specialist.getCenter().getId().equals(centerId)) {
            throw new RuntimeException("Ce spécialiste n'appartient pas à ce centre");
        }
        specialistRepository.delete(specialist);
    }
}
