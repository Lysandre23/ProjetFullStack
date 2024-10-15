package org.example.service;

import org.example.model.Specialist;
import org.example.repository.SpecialistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialistService {

    @Autowired
    public SpecialistRepository specialistRepository;

    public List<Specialist> findAll() {
        return specialistRepository.findAll();
    }

    public Specialist create(Specialist specialist) { return specialistRepository.save(specialist); }

    public void removeOne(Integer id) { specialistRepository.deleteById(id); }
}
