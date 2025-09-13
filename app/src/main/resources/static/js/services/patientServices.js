// patientServices.js
// This module centralizes all API communication related to patient data.
// It handles sign-up, login, appointment management while keeping logic separated from UI code.

// Import the API Base URL from configuration
import { API_BASE_URL } from "../config/config.js";

// Set the Base Patient API Endpoint
const PATIENT_API = API_BASE_URL + '/patient';

/**
 * Function to handle patient signup
 * @param {Object} data - Patient registration data (name, email, password, etc.)
 * @returns {Object} - Structured response with success status and message
 */
export async function patientSignup(data) {
    try {
        // Send POST request to signup endpoint
        const response = await fetch(`${PATIENT_API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Extract response data
        const result = await response.json();
        
        if (response.ok) {
            // Return success response
            return {
                success: true,
                message: result.message || 'Patient registered successfully'
            };
        } else {
            // Return error response
            return {
                success: false,
                message: result.message || 'Registration failed'
            };
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error during patient signup:', error);
        return {
            success: false,
            message: 'Network error. Please try again later.'
        };
    }
}

/**
 * Function for patient login
 * @param {Object} data - Login credentials (email, password)
 * @returns {Response} - Full fetch response for status checking and token extraction
 */
export async function patientLogin(data) {
    try {
        // Log input data for development (remove in production)
        console.log('Patient login attempt:', data);
        
        // Send POST request to login endpoint
        const response = await fetch(`${PATIENT_API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Return full response for frontend processing
        return response;
    } catch (error) {
        // Handle network errors
        console.error('Error during patient login:', error);
        throw new Error('Network error during login');
    }
}

/**
 * Function to fetch logged-in patient data
 * @param {string} token - Authentication token from localStorage
 * @returns {Object|null} - Patient object or null if failed
 */
export async function getPatientData(token) {
    try {
        // Send GET request with authentication token
        const response = await fetch(`${PATIENT_API}/data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Extract and return patient data
            const patientData = await response.json();
            return patientData;
        } else {
            // Log error and return null
            console.error('Failed to fetch patient data:', response.status);
            return null;
        }
    } catch (error) {
        // Handle errors gracefully
        console.error('Error fetching patient data:', error);
        return null;
    }
}

/**
 * Function to fetch patient appointments (supports both patient and doctor dashboards)
 * @param {string} id - Patient's unique identifier
 * @param {string} token - Authentication token
 * @param {string} user - User type ("patient" or "doctor")
 * @returns {Array|null} - Array of appointments or null if failed
 */
export async function getPatientAppointments(id, token, user) {
    try {
        // Construct dynamic API URL based on user type
        const endpoint = `${PATIENT_API}/appointments/${id}?user=${user}`;
        
        // Send GET request with authentication
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Extract and return appointments array
            const appointments = await response.json();
            return appointments;
        } else {
            // Log error and return null
            console.error('Failed to fetch appointments:', response.status);
            return null;
        }
    } catch (error) {
        // Handle errors and return null
        console.error('Error fetching patient appointments:', error);
        return null;
    }
}

/**
 * Function to filter appointments based on condition
 * @param {string} condition - Filter condition ("pending", "consulted", etc.)
 * @param {string} name - Patient or doctor name for filtering
 * @param {string} token - Authentication token
 * @returns {Array} - Filtered appointments array or empty array if failed
 */
export async function filterAppointments(condition, name, token) {
    try {
        // Construct filtered endpoint URL
        const endpoint = `${PATIENT_API}/appointments/filter?condition=${condition}&name=${encodeURIComponent(name)}`;
        
        // Send GET request to filtered endpoint
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Extract and return filtered appointments
            const filteredAppointments = await response.json();
            return filteredAppointments;
        } else {
            // Log error and return empty array
            console.error('Failed to filter appointments:', response.status);
            return [];
        }
    } catch (error) {
        // Handle errors gracefully
        console.error('Error filtering appointments:', error);
        
        // Alert user for unexpected errors
        alert('An unexpected error occurred while filtering appointments. Please try again.');
        
        // Return empty array as fallback
        return [];
    }
}

/**
 * Additional utility function to book a new appointment
 * @param {Object} appointmentData - Appointment details
 * @param {string} token - Authentication token
 * @returns {Object} - Response with success status and message
 */
export async function bookAppointment(appointmentData, token) {
    try {
        // Send POST request to book appointment
        const response = await fetch(`${PATIENT_API}/appointments/book`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: result.message || 'Appointment booked successfully'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to book appointment'
            };
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        return {
            success: false,
            message: 'Network error. Please try again later.'
        };
    }
}

/**
 * Function to cancel an appointment
 * @param {string} appointmentId - ID of the appointment to cancel
 * @param {string} token - Authentication token
 * @returns {Object} - Response with success status and message
 */
export async function cancelAppointment(appointmentId, token) {
    try {
        // Send DELETE request to cancel appointment
        const response = await fetch(`${PATIENT_API}/appointments/${appointmentId}/cancel`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: result.message || 'Appointment cancelled successfully'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to cancel appointment'
            };
        }
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        return {
            success: false,
            message: 'Network error. Please try again later.'
        };
    }
}
