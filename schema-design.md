Clinic Management System Database Design

1. MySQL Database Design

Table: patients

id: INT, Primary Key, Auto Increment
first_name: VARCHAR(50), Not Null
last_name: VARCHAR(50), Not Null
email: VARCHAR(100), Unique, Not Null
phone: VARCHAR(15), Not Null
date_of_birth: DATE, Not Null
gender: ENUM('M', 'F', 'Other')
address: TEXT
emergency_contact_name: VARCHAR(100)
emergency_contact_phone: VARCHAR(15)
created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

Table: doctors

id: INT, Primary Key, Auto Increment
first_name: VARCHAR(50), Not Null
last_name: VARCHAR(50), Not Null
email: VARCHAR(100), Unique, Not Null
phone: VARCHAR(15), Not Null
specialization: VARCHAR(100), Not Null
clinic_location_id: INT, Foreign Key → clinic_locations(id)
created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

Table: appointments

id: INT, Primary Key, Auto Increment
doctor_id: INT, Foreign Key → doctors(id), Not Null
patient_id: INT, Foreign Key → patients(id), Not Null
appointment_date: DATE, Not Null
appointment_time: TIME, Not Null
duration_minutes: INT, Default 30
status: ENUM('scheduled', 'completed', 'cancelled', 'no_show'), Default 'scheduled'
appointment_type: ENUM('consultation', 'follow_up', 'emergency', 'routine_checkup')
notes: TEXT
created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
UNIQUE KEY unique_doctor_datetime (doctor_id, appointment_date, appointment_time

Table: admin

id: INT, Primary Key, Auto Increment
username: VARCHAR(50), Unique, Not Null
email: VARCHAR(100), Unique, Not Null
password_hash: VARCHAR(255), Not Null
first_name: VARCHAR(50), Not Null
last_name: VARCHAR(50), Not Null
role: ENUM('super_admin', 'clinic_admin', 'receptionist'), Default 'receptionist'
clinic_location_id: INT, Foreign Key → clinic_locations(id)
last_login: TIMESTAMP
created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

2 . MongoDB Collection Design

Collection: prescriptions

json

{
  "_id": "ObjectId('64abc123456')",
  "patientName": "John Smith",
  "appointmentId": 51,
  "medication": "Paracetamol",
  "dosage": "500mg",
  "doctorNotes": "Take 1 tablet every 6 hours.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  }
}

