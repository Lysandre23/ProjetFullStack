package org.example.repository;

import org.example.model.Specialist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpecialistRepository extends JpaRepository<Specialist, Long> {
    public List<Specialist> findBySpecialty(String specialty);
    public List<Specialist> findByAdminTrue();
    public List<Specialist> findBySuperAdminTrue();
}
