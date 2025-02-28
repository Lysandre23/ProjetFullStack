package org.example.exception;

public class PatientNotFoundException extends RuntimeException {
    public PatientNotFoundException() {
        super("Patient not found");
    }

    public PatientNotFoundException(Long id) {
        super("Patient not found with id: " + id);
    }
}
