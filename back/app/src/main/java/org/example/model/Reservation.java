package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer centerid;
    private Integer specialistid;
    private Integer patientid;

    private Date date;

    public Reservation() {}

    public Reservation(Integer id, Integer centerid, Integer specialistid, Integer patientid, Date date) {
        this.id = id;
        this.centerid = centerid;
        this.specialistid = specialistid;
        this.patientid = patientid;
        this.date = date;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getCenterid() { return centerid; }
    public void setCenterid(Integer centerid) { this.centerid = centerid; }
    public Integer getSpecialistid() { return specialistid; }
    public void setSpecialistid(Integer specialistid) { this.specialistid = specialistid; }
    public Integer getPatientid() { return patientid; }
    public void setPatientid(Integer patientid) { this.patientid = patientid; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
}
