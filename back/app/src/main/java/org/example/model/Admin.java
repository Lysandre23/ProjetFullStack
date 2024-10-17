package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private Boolean isSuperAdmin;
    private Integer centerid;

    public Admin() {}

    public Admin(Integer id, String name, Boolean isSuperAdmin, Integer centerid) {
        this.id = id;
        this.name = name;
        this.isSuperAdmin = isSuperAdmin;
        this.centerid = centerid == null ? 0 : centerid;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Boolean getIsSuperAdmin() { return isSuperAdmin; }
    public void setIsSuperAdmin(Boolean isSuperAdmin) { this.isSuperAdmin = isSuperAdmin; }
    public Integer getCenterid() { return centerid; }
    public void setCenterid(Integer centerid) { this.centerid = centerid; }
}
