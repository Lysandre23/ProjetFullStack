package org.example.dto;

import org.example.model.Patient;
import java.util.Date;

public class PatientDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private Date birthdate;

    public static PatientDTO fromPatient(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setFirstname(patient.getFirstname());
        dto.setLastname(patient.getLastname());
        dto.setEmail(patient.getEmail());
        dto.setPhone(patient.getPhone());
        dto.setBirthdate(patient.getBirthdate());
        return dto;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }
    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Date getBirthdate() { return birthdate; }
    public void setBirthdate(Date birthdate) { this.birthdate = birthdate; }
} 