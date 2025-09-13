// Import API Base URL from configuration
import { API_BASE_URL } from "../config/config.js";

// Set Doctor API Endpoint
const DOCTOR_API = API_BASE_URL + '/doctor';

/**
 * Function to get all doctors
 * Sends a GET request to retrieve all doctors from the database
 * @returns {Array} List of doctors or empty array if error occurs
 */
export async function getDoctors() {
    try {
        const response = await fetch(`${DOCTOR_API}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
}

/**
 * Function to delete a doctor
 * Sends a DELETE request to remove a doctor from the system
 * @param {number} id - The doctor's unique identifier
 * @param {string} token - Authentication token for security
 * @returns {Object} Response object with success status and message
 */
export async function deleteDoctor(id, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || `HTTP error! status: ${response.status}`
            };
        }

        return {
            success: true,
            message: data.message || 'Doctor deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting doctor:', error);
        return {
            success: false,
            message: 'Failed to delete doctor. Please try again.'
        };
    }
}

/**
 * Function to save (add) a new doctor
 * Sends a POST request to create a new doctor record
 * @param {Object} doctor - Doctor object containing all doctor details
 * @param {string} token - Authentication token for Admin access
 * @returns {Object} Response object with success status and message
 */
export async function saveDoctor(doctor, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || `HTTP error! status: ${response.status}`
            };
        }

        return {
            success: true,
            message: data.message || 'Doctor added successfully',
            data: data
        };
    } catch (error) {
        console.error('Error saving doctor:', error);
        return {
            success: false,
            message: 'Failed to save doctor. Please try again.'
        };
    }
}

/**
 * Function to filter doctors
 * Sends a GET request with filter parameters to retrieve matching doctors
 * @param {string} name - Doctor's name filter (optional)
 * @param {string} time - Available time filter (optional)
 * @param {string} specialty - Doctor's specialty filter (optional)
 * @returns {Array} Filtered list of doctors or empty array if error occurs
 */
export async function filterDoctors(name, time, specialty) {
    try {
        // Build query parameters
        const params = new URLSearchParams();
        
        if (name && name.trim() !== '') {
            params.append('name', name.trim());
        }
        if (time && time.trim() !== '') {
            params.append('time', time.trim());
        }
        if (specialty && specialty.trim() !== '') {
            params.append('specialty', specialty.trim());
        }

        // Construct the URL with query parameters
        const url = params.toString() 
            ? `${DOCTOR_API}/filter?${params.toString()}`
            : `${DOCTOR_API}/all`; // If no filters, get all doctors

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error filtering doctors:', error);
        alert('Failed to filter doctors. Please try again.');
        return [];
    }
}

/**
 * Function to get a single doctor by ID
 * Sends a GET request to retrieve a specific doctor
 * @param {number} id - The doctor's unique identifier
 * @returns {Object|null} Doctor object or null if error occurs
 */
export async function getDoctorById(id) {
    try {
        const response = await fetch(`${DOCTOR_API}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching doctor by ID:', error);
        return null;
    }
}

/**
 * Function to update an existing doctor
 * Sends a PUT request to update doctor information
 * @param {number} id - The doctor's unique identifier
 * @param {Object} doctor - Updated doctor object
 * @param {string} token - Authentication token for Admin access
 * @returns {Object} Response object with success status and message
 */
export async function updateDoctor(id, doctor, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || `HTTP error! status: ${response.status}`
            };
        }

        return {
            success: true,
            message: data.message || 'Doctor updated successfully',
            data: data
        };
    } catch (error) {
        console.error('Error updating doctor:', error);
        return {
            success: false,
            message: 'Failed to update doctor. Please try again.'
        };
    }
}
