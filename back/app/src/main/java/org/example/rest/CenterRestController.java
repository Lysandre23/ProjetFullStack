package org.example.rest;

import jakarta.transaction.Transactional;
import org.example.model.Center;
import org.example.model.Specialist;
import org.example.repository.SpecialistRepository;
import org.example.service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/centers")
public class CenterRestController {
    @Autowired
    private CenterService centerService;

    @Autowired
    private SpecialistRepository specialistRepository;

    @GetMapping("")
    public List<Center> findAll() {
        return centerService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Center> findById(@PathVariable Long id) {
        return centerService.findById(id)
                .map(center -> ResponseEntity.ok().body(center))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/city/{city}")
    public List<Center> findByCity(@PathVariable String city) {
        return centerService.findByCityLike(city);
    }

    @PostMapping("")
    public ResponseEntity<Center> save(@RequestBody Center center) throws URISyntaxException {
        if (center.getSpecialists() == null) {
            center.setSpecialists(new ArrayList<>());
        }
        Center savedCenter = centerService.create(center);
        return ResponseEntity
            .created(new URI("/api/centers/" + savedCenter.getId()))
            .body(savedCenter);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Center> update(@PathVariable Long id, @RequestBody Center center) {
        return centerService.update(id, center)
                .map(updatedCenter -> ResponseEntity.ok().body(updatedCenter))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return centerService.delete(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/specialists")
    public List<Specialist> findSpecialistsByCenterId(@PathVariable Long id) {
        return centerService.findSpecialistsByCenterId(id);
    }

    @PostMapping("/{id}/specialists")
    public ResponseEntity<Specialist> addSpecialist(@PathVariable Long id, @RequestBody Specialist specialist) throws URISyntaxException {
        return centerService.findById(id)
                .map(center -> {
                    specialist.setCenter(center);
                    Specialist savedSpecialist = specialistRepository.save(specialist);
                    return ResponseEntity
                            .created(URI.create("/api/specialists/" + savedSpecialist.getId()))
                            .body(savedSpecialist);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
