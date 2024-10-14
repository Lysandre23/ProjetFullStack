package org.example.service;

import org.example.repository.SpecialistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialistService {
    @Autowired
    private SpecialistRepository specialistRepository;

    public List<Specialist> findAll() {
        return specialistRepository.findAll();
    }

    public void create(Specialist specialist) { specialistRepository.save(specialist); }
}
