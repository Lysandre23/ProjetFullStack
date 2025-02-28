package org.example.service;

import org.example.model.Center;
import org.example.model.Specialist;
import org.example.repository.CenterRepository;
import org.example.repository.SpecialistRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Center create(Center center) {
        return centerRepository.save(center);
    }

    public List<Center> findByCityLike(String city) {
        return centerRepository.findByCityLike(city);
    }

    public Optional<Center> findById(Long id) {
        return centerRepository.findById(id);
    }

    public List<Specialist> findSpecialistsByCenterId(Long id) {
        return centerRepository.findSpecialistsByCenterId(id);
    }

    public Optional<Center> update(Long id, Center center) {
        return centerRepository.findById(id)
            .map(existingCenter -> {
                center.setId(id);
                return centerRepository.save(center);
            });
    }

    public boolean delete(Long id) {
        return centerRepository.findById(id)
            .map(center -> {
                centerRepository.delete(center);
                return true;
            })
            .orElse(false);
    }
}
