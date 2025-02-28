package org.example.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Specialist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String specialty;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String phone;
    private boolean admin;
    private boolean superAdmin;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;

    @JsonIgnore
    @OneToMany(mappedBy = "specialist", cascade = CascadeType.ALL)
    private List<Reservation> reservations;

    public Specialist() {
        this.reservations = new ArrayList<>();
        this.admin = false;
        this.superAdmin = false;
    }

    public Specialist(String name, String specialty, String email, String password, String phone, boolean admin, boolean superAdmin) {
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.admin = admin;
        this.reservations = new ArrayList<>();
        this.superAdmin = superAdmin;
    }

    public Long getId() { return id; }
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
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public List<Reservation> getReservations() { return reservations; }
    public void setReservations(List<Reservation> reservations) { this.reservations = reservations; }
    public boolean isAdmin() { return admin; }
    public void setAdmin(boolean admin) { this.admin = admin; }
    public boolean isSuperAdmin() { return superAdmin; }
    public void setSuperAdmin(boolean superAdmin) { 
        this.superAdmin = superAdmin;
        if (superAdmin) {
            this.admin = true;
        }
    }

    public boolean canManageCenter(Center center) {
        if (this.superAdmin) {
            return true;
        }
        if (this.admin && this.center != null && center != null) {
            return this.center.getId().equals(center.getId());
        }
        return false;
    }
}
