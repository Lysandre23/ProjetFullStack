package org.example.service;

import org.example.model.Center;
import org.example.repository.CenterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CenterService {
    private final CenterRepository centerRepository;

    public CenterService(CenterRepository centerRepository) {
        this.centerRepository = centerRepository;
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

    public Center findById(int id) {
        return centerRepository.findById(id);
    }
}
