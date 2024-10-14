package org.example.service;

import java.util.Date;

public class User {
    private Integer id;
    private Integer center_id;
    private String name;
    private String specialty;
    private String email;
    private String phone;
    private String password;
    private Date created_at;
    private Date updated_at;
    public Boolean is_admin;

    public User() {}

    public User(Integer id, Integer center_id, String name, String specialty, String email, String phone, String password, Date created_at, Date updated_at, Boolean is_admin) {
        this.id = id;
        this.center_id = center_id;
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.is_admin = is_admin;
    }

    public String GetName() { return name; }
}
