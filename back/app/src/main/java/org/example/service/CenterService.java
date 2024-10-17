package org.example.service;

import org.example.model.Center;
import org.example.repository.CenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CenterService {
    @Autowired
    private CenterRepository centerRepository;

    public List<Center> findAll() {
        return centerRepository.findAll();
    }

    public void create(Center center) {
        centerRepository.save(center);
    }

    public List<Center> findByCityLike(String city) {
        return centerRepository.findByCityLike(city);
    }
}
