package org.example.repository;

import org.example.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    public List<Admin> findAdminsByIsSuperAdminTrue();
}
