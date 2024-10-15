package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Reservation {
    @Id
    private Long id;

    private Long center_id;
    private Long specialist_id;
    private Long patient_id;

    private Date date;

    public Reservation() {}

    public Reservation(Long id, Long center_id, Long specialist_id, Long patient_id, Date date) {
        this.id = id;
        this.center_id = center_id;
        this.specialist_id = specialist_id;
        this.patient_id = patient_id;
        this.date = date;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCenterId() { return center_id; }
    public void setCenterId(Long center_id) { this.center_id = center_id; }
    public Long getSpecialistId() { return specialist_id; }
    public void setSpecialistId(Long specialist_id) { this.specialist_id = specialist_id; }
    public Long getPatientId() { return patient_id; }
    public void setPatientId(Long patient_id) { this.patient_id = patient_id; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
}
