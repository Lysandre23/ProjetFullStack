package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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
    private Integer adminid;

    public Center() {}

    public Center(Integer id, String name, String city, String address, String phone, String email, Integer adminid) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.adminid = adminid;
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
    public Integer getAdminid() { return adminid; }
    public void setAdminid(Integer adminid) { this.adminid = adminid; }
}
