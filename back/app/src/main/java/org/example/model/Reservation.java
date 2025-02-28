package org.example.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "specialist_id")
    private Specialist specialist;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private Date date;
    private boolean done;

    public Reservation() {}

    public Reservation(Integer id, Specialist specialist, Patient patient, Date date, boolean done) {
        this.id = id;
        this.specialist = specialist;
        this.patient = patient;
        this.date = date;
        this.done = done;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Specialist getSpecialist() { return specialist; }
    public void setSpecialist(Specialist specialist) { this.specialist = specialist; }
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
    public boolean isDone() { return done; }
    public void setDone(boolean done) { this.done = done; }
}
