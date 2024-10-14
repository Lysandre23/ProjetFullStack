package org.example.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.example.exception.PatientNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    

    private static List<Patient> patients = new ArrayList<>();

    public List<Patient> findAll(String name){
        return patients.stream()
            .filter(p->p.getName().startsWith(name))
            .toList();
    }

    public Patient findOne(Integer id) throws PatientNotFoundException{
        return patients.stream()
            .filter(p->p.getId().equals(id))
            .findFirst()
            .orElseThrow(PatientNotFoundException::new);
    }

    public void create(Patient p){
        patients.add(p);
    }

    public void removeOne(Integer id){
        patients.removeIf(p->p.getId().equals(id));
    }
}
