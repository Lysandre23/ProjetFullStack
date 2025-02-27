package org.example.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.springframework.context.annotation.Role;

import java.util.List;

@Entity
public class Center {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String city;
    private String address;
    private String phone;
    private String email;

    @JsonBackReference
    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    private List<Specialist> specialists;

    public Center() {}

    public Center(Integer id, String name, String city, String address, String phone, String email, List<Specialist> specialists) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.specialists = specialists;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public List<Specialist> getSpecialists() { return specialists; }
    public void setSpecialists(List<Specialist> Specialists) { this.specialists = Specialists; }
}
