package org.example.rest;

import org.example.model.Center;
import org.example.service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/centers")
public class CenterRestController {
    @Autowired
    private CenterService centerService;

    @GetMapping("")
    public List<Center> findAll() {
        return centerService.findAll();
    }

    @GetMapping("/city/{city}")
    public List<Center> findByCity(@PathVariable String city) {
        return centerService.findByCityLike(city);
    }

    @PostMapping("")
    public ResponseEntity<Center> save(@RequestBody Center center) throws URISyntaxException {
        centerService.create(center);
        return ResponseEntity.created(new URI("centers/" + center.getId())).build();
    }
}
