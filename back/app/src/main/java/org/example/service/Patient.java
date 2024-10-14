package org.example.service;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String surname;
    private String phone;
    private String email;
    private Date birth_date;


    public Patient(){}

    public Patient(Integer id, String name, String surname, Date birth_date, String phone, String email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birth_date = birth_date;
        this.phone = phone;
        this.email = email;

    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Date getBirth_date() { return birth_date; }
    public void setBirth_date(Date birth_date) { this.birth_date = birth_date; }
}
