package org.example.service;

import org.example.model.Admin;
import org.example.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> findAll() {
        return adminRepository.findAll();
    }

    public List<Admin> findSuperAdmins() {
        return adminRepository.findAdminsByIsSuperAdminTrue();
    }

    public void create(Admin admin) {
        adminRepository.save(admin);
    }
}
