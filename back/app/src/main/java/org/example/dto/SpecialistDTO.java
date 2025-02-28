package org.example.dto;

import org.example.model.Specialist;
import org.example.model.Center;

public class SpecialistDTO {
    private Long id;
    private String name;
    private String specialty;
    private String email;
    private String phone;
    private CenterInfo center;

    public static class CenterInfo {
        private Long id;
        private String name;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public static SpecialistDTO fromSpecialist(Specialist specialist) {
        SpecialistDTO dto = new SpecialistDTO();
        dto.setId(specialist.getId());
        dto.setName(specialist.getName());
        dto.setSpecialty(specialist.getSpecialty());
        dto.setEmail(specialist.getEmail());
        dto.setPhone(specialist.getPhone());
        
        if (specialist.getCenter() != null) {
            CenterInfo centerInfo = new CenterInfo();
            centerInfo.setId(specialist.getCenter().getId());
            centerInfo.setName(specialist.getCenter().getName());
            dto.setCenter(centerInfo);
        }
        
        return dto;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public CenterInfo getCenter() { return center; }
    public void setCenter(CenterInfo center) { this.center = center; }
} 