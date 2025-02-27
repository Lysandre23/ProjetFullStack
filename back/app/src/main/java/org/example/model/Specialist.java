package org.example.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class Specialist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String specialty;
    private String email;
    private String phone;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;

    public Specialist() {}

    public Specialist(Integer id, String name, String specialty, String email, String phone, Center center) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.phone = phone;
        this.center = center;
    }

    public Integer getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Center getCenter() { return center; }
    public void setCenter(Center center) { this.center = center; }
}
