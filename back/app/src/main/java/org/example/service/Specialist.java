package org.example.service;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Specialist {

    @Id
    private Integer id;

    private Integer center_id;
    private String name;
    private String specialty;
    private String email;
    private String phone;
    private String password;
    public Boolean is_admin;

    public Specialist() {}

    public Specialist(Integer id, Integer center_id, String name, String specialty, String email, String phone, String password, Boolean is_admin) {
        this.id = id;
        this.center_id = center_id;
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.is_admin = is_admin;
    }

    public Integer getId() { return id; }
    public String getName() { return name; }
    public Integer getCenterId() { return center_id; }
    public void setCenterId(Integer center_id) { this.center_id = center_id; }
    public void setName(String name) { this.name = name; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Boolean getIsAdmin() { return is_admin; }
    public void setIsAdmin(Boolean is_admin) { this.is_admin = is_admin; }

}
