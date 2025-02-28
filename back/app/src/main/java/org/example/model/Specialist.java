package org.example.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private String password;
    private String phone;
    private boolean isAdmin;
    private boolean isSuperAdmin;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;

    @JsonIgnore
    @OneToMany(mappedBy = "specialist", cascade = CascadeType.ALL)
    private List<Reservation> reservations;

    public Specialist() {
        this.reservations = new ArrayList<>();
        this.isAdmin = false;
        this.isSuperAdmin = false;
    }

    public Specialist(String name, String specialty, String email, String password, String phone, boolean isAdmin) {
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.isAdmin = isAdmin;
        this.reservations = new ArrayList<>();
        this.isSuperAdmin = false;
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
    public boolean isAdmin() { return isAdmin; }
    public void setAdmin(boolean admin) { isAdmin = admin; }
    public boolean isSuperAdmin() { return isSuperAdmin; }
    public void setSuperAdmin(boolean superAdmin) { 
        isSuperAdmin = superAdmin;
        if (superAdmin) {
            this.isAdmin = true;
        }
    }

    public boolean canManageCenter(Center center) {
        if (this.isSuperAdmin) {
            return true;
        }
        if (this.isAdmin && this.center != null && center != null) {
            return this.center.getId().equals(center.getId());
        }
        return false;
    }
}
