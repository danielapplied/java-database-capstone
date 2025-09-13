// Import statements
import { showBookingOverlay } from './loggedPatient.js';
import { deleteDoctor } from './services/doctorServices.js';
import { getPatientDetails } from './services/patientServices.js';

/**
 * Function to create and return a DOM element for a single doctor card
 * @param {Object} doctor - Doctor object containing doctor information
 * @returns {HTMLElement} - Complete doctor card element
 */
function createDoctorCard(doctor) {
    // Create the main container for the doctor card
    const doctorCard = document.createElement('div');
    doctorCard.className = 'doctor-card';
    doctorCard.setAttribute('data-doctor-id', doctor.id);

    // Retrieve the current user role from localStorage
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('token');

    // Create a div to hold doctor information
    const doctorInfo = document.createElement('div');
    doctorInfo.className = 'doctor-info';

    // Create and set the doctor's name
    const doctorName = document.createElement('h3');
    doctorName.className = 'doctor-name';
    doctorName.textContent = `Dr. ${doctor.name}`;

    // Create and set the doctor's specialization
    const doctorSpecialization = document.createElement('p');
    doctorSpecialization.className = 'doctor-specialization';
    doctorSpecialization.textContent = `Specialization: ${doctor.specialization}`;

    // Create and set the doctor's email
    const doctorEmail = document.createElement('p');
    doctorEmail.className = 'doctor-email';
    doctorEmail.textContent = `Email: ${doctor.email}`;

    // Create and list available appointment times
    const appointmentTimes = document.createElement('div');
    appointmentTimes.className = 'appointment-times';
    const timesLabel = document.createElement('p');
    timesLabel.textContent = 'Available Times:';
    appointmentTimes.appendChild(timesLabel);

    if (doctor.availableTimes && doctor.availableTimes.length > 0) {
        const timesList = document.createElement('ul');
        doctor.availableTimes.forEach(time => {
            const timeItem = document.createElement('li');
            timeItem.textContent = time;
            timesList.appendChild(timeItem);
        });
        appointmentTimes.appendChild(timesList);
    } else {
        const noTimes = document.createElement('p');
        noTimes.textContent = 'No available times';
        noTimes.className = 'no-times';
        appointmentTimes.appendChild(noTimes);
    }

    // Append all info elements to the doctor info container
    doctorInfo.appendChild(doctorName);
    doctorInfo.appendChild(doctorSpecialization);
    doctorInfo.appendChild(doctorEmail);
    doctorInfo.appendChild(appointmentTimes);

    // Create a container for card action buttons
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'card-actions';

    // === ADMIN ROLE ACTIONS ===
    if (userRole === 'admin') {
        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete Doctor';

        // Add click handler for delete button
        deleteButton.addEventListener('click', async () => {
            if (confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
                try {
                    // Get the admin token from localStorage
                    const adminToken = localStorage.getItem('token');
                    
                    // Call API to delete the doctor
                    const result = await deleteDoctor(doctor.id, adminToken);
                    
                    // Show result and remove card if successful
                    if (result.success) {
                        alert('Doctor deleted successfully');
                        doctorCard.remove();
                    } else {
                        alert('Failed to delete doctor: ' + result.message);
                    }
                } catch (error) {
                    alert('Error deleting doctor: ' + error.message);
                }
            }
        });

        // Add delete button to actions container
        actionsContainer.appendChild(deleteButton);
    }
    // === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
    else if (!isLoggedIn) {
        // Create a book now button
        const bookButton = document.createElement('button');
        bookButton.className = 'book-btn';
        bookButton.textContent = 'Book Now';

        // Alert patient to log in before booking
        bookButton.addEventListener('click', () => {
            alert('Please log in to book an appointment');
            // Optionally redirect to login page
            window.location.href = '/login.html';
        });

        // Add button to actions container
        actionsContainer.appendChild(bookButton);
    }
    // === LOGGED-IN PATIENT ROLE ACTIONS ===
    else if (userRole === 'patient' && isLoggedIn) {
        // Create a book now button
        const bookButton = document.createElement('button');
        bookButton.className = 'book-btn';
        bookButton.textContent = 'Book Now';

        // Handle booking logic for logged-in patient
        bookButton.addEventListener('click', async () => {
            try {
                const token = localStorage.getItem('token');
                
                // Redirect if token not available
                if (!token) {
                    alert('Session expired. Please log in again.');
                    window.location.href = '/login.html';
                    return;
                }

                // Fetch patient data with token
                const patientData = await getPatientDetails(token);
                
                if (patientData.success) {
                    // Show booking overlay UI with doctor and patient info
                    showBookingOverlay(doctor, patientData.patient);
                } else {
                    alert('Failed to fetch patient details: ' + patientData.message);
                }
            } catch (error) {
                alert('Error loading patient details: ' + error.message);
            }
        });

        // Add button to actions container
        actionsContainer.appendChild(bookButton);
    }

    // Append doctor info and action buttons to the card
    doctorCard.appendChild(doctorInfo);
    doctorCard.appendChild(actionsContainer);

    // Return the complete doctor card element
    return doctorCard;
}

export { createDoctorCard };


/*
Import the overlay function for booking appointments from loggedPatient.js

  Import the deleteDoctor API function to remove doctors (admin role) from docotrServices.js

  Import function to fetch patient details (used during booking) from patientServices.js

  Function to create and return a DOM element for a single doctor card
    Create the main container for the doctor card
    Retrieve the current user role from localStorage
    Create a div to hold doctor information
    Create and set the doctor’s name
    Create and set the doctor's specialization
    Create and set the doctor's email
    Create and list available appointment times
    Append all info elements to the doctor info container
    Create a container for card action buttons
    === ADMIN ROLE ACTIONS ===
      Create a delete button
      Add click handler for delete button
     Get the admin token from localStorage
        Call API to delete the doctor
        Show result and remove card if successful
      Add delete button to actions container
   
    === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
      Create a book now button
      Alert patient to log in before booking
      Add button to actions container
  
    === LOGGED-IN PATIENT ROLE ACTIONS === 
      Create a book now button
      Handle booking logic for logged-in patient   
        Redirect if token not available
        Fetch patient data with token
        Show booking overlay UI with doctor and patient info
      Add button to actions container
   
  Append doctor info and action buttons to the car
  Return the complete doctor card element
*/
