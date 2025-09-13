package com.project.back_end.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
public class Appointment {

    // 1. 'id' field - Primary key with auto-generation
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 2. 'doctor' field - Many-to-One relationship with Doctor
    @ManyToOne
    @NotNull
    private Doctor doctor;

    // 3. 'patient' field - Many-to-One relationship with Patient
    @ManyToOne
    @NotNull
    private Patient patient;

    // 4. 'appointmentTime' field - Future date/time validation
    @Future
    @NotNull
    private LocalDateTime appointmentTime;

    // 5. 'status' field - Integer status (0=scheduled, 1=completed)
    @NotNull
    private Integer status;

    // 9. Constructors
    // No-argument constructor (required by JPA)
    public Appointment() {
    }

    // Parameterized constructor
    public Appointment(Doctor doctor, Patient patient, LocalDateTime appointmentTime, Integer status) {
        this.doctor = doctor;
        this.patient = patient;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    // 6. 'getEndTime' method - Transient field calculating end time
    @Transient
    public LocalDateTime getEndTime() {
        return appointmentTime != null ? appointmentTime.plusHours(1) : null;
    }

    // 7. 'getAppointmentDate' method - Extract date part only
    @Transient
    public LocalDate getAppointmentDate() {
        return appointmentTime != null ? appointmentTime.toLocalDate() : null;
    }

    // 8. 'getAppointmentTimeOnly' method - Extract time part only
    @Transient
    public LocalTime getAppointmentTimeOnly() {
        return appointmentTime != null ? appointmentTime.toLocalTime() : null;
    }

    // 10. Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    // Additional utility methods for status
    public boolean isScheduled() {
        return status != null && status == 0;
    }

    public boolean isCompleted() {
        return status != null && status == 1;
    }

    // toString method for debugging
    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", doctor=" + (doctor != null ? doctor.getId() : null) +
                ", patient=" + (patient != null ? patient.getId() : null) +
                ", appointmentTime=" + appointmentTime +
                ", status=" + status +
                '}';
    }

    // equals and hashCode methods
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appointment that = (Appointment) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
