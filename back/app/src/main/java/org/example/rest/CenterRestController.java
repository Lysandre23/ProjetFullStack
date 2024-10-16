package org.example.rest;

import jakarta.annotation.security.RolesAllowed;
import org.example.model.Center;
import org.example.service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
public class CenterRestController {
    @Autowired
    private CenterService centerService;

    @GetMapping("/centers")
    public List<Center> findAll() {
        return centerService.findAll();
    }

    @PostMapping("/centers")
    public ResponseEntity<Center> save(@RequestBody Center center) throws URISyntaxException {
        centerService.create(center);
        return ResponseEntity.created(new URI("centers/" + center.getId())).build();
    }
}
