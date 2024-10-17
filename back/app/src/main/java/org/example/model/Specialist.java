package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Specialist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer centerid;
    private String name;
    private String specialty;
    private String email;
    private String phone;

    public Specialist() {}

    public Specialist(Integer id, Integer centerid, String name, String specialty, String email, String phone) {
        this.id = id;
        this.centerid = centerid;
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.phone = phone;
    }

    public Integer getId() { return id; }
    public String getName() { return name; }
    public Integer getCenterid() { return centerid; }
    public void setCenterid(Integer centerid) { this.centerid = centerid; }
    public void setName(String name) { this.name = name; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

}
