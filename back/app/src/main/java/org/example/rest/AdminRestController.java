package org.example.rest;

import org.example.model.Admin;
import org.example.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminRestController {
    @Autowired
    private AdminService adminService;

    @GetMapping("")
    public List<Admin> findAll() {
        return adminService.findAll();
    }

    @GetMapping("/super")
    public List<Admin> findSuperAdmin() {
        return adminService.findSuperAdmins();
    }

    @PostMapping("")
    public ResponseEntity<Admin> create(@RequestBody Admin admin) throws URISyntaxException {
        adminService.create(admin);
        return ResponseEntity.created(new URI("/admins/" + admin.getId())).build();
    }
}
