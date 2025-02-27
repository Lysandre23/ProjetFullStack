package org.example.rest;

import jakarta.transaction.Transactional;
import org.example.model.Center;
import org.example.model.Specialist;
import org.example.repository.CenterRepository;
import org.example.repository.SpecialistRepository;
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

    @Autowired
    private CenterRepository centerRepository;

    @Autowired
    private SpecialistRepository specialistRepository;

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

    @GetMapping("/{id}/specialists")
    public List<Specialist> findSpecialistsByCenterId(@PathVariable int id) {
        Center center = centerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Centre introuvable"));
        return center.getSpecialists();
    }

    @PostMapping("/{id}/specialist")
    public Specialist createSpecialist(@PathVariable int id, @RequestBody Specialist specialist) {
        Center center = centerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Centre introuvable"));

        specialist.setCenter(center);
        return specialistRepository.save(specialist);
    }
}
