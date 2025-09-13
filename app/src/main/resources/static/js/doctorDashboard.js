// Import getAllAppointments to fetch appointments from the backend
// Import createPatientRow to generate a table row for each patient appointment
import { getAllAppointments } from './api.js';
import { createPatientRow } from './components.js';

// Get the table body where patient rows will be added
const tableBody = document.querySelector('#appointments-table tbody');

// Initialize selectedDate with today's date in 'YYYY-MM-DD' format
let selectedDate = new Date().toISOString().split('T')[0];

// Get the saved token from localStorage (used for authenticated API calls)
const token = localStorage.getItem('token');

// Initialize patientName to null (used for filtering by name)
let patientName = null;

// Add an 'input' event listener to the search bar
const searchBar = document.querySelector('#patient-search');
searchBar.addEventListener('input', (e) => {
  // On each keystroke:
  // - Trim and check the input value
  const inputValue = e.target.value.trim();
  
  // - If not empty, use it as the patientName for filtering
  // - Else, reset patientName to "null" (as expected by backend)
  patientName = inputValue !== '' ? inputValue : null;
  
  // - Reload the appointments list with the updated filter
  loadAppointments();
});

// Add a click listener to the "Today" button
const todayButton = document.querySelector('#today-button');
todayButton.addEventListener('click', () => {
  // When clicked:
  // - Set selectedDate to today's date
  selectedDate = new Date().toISOString().split('T')[0];
  
  // - Update the date picker UI to match
  const datePicker = document.querySelector('#date-picker');
  datePicker.value = selectedDate;
  
  // - Reload the appointments for today
  loadAppointments();
});

// Add a change event listener to the date picker
const datePicker = document.querySelector('#date-picker');
datePicker.addEventListener('change', (e) => {
  // When the date changes:
  // - Update selectedDate with the new value
  selectedDate = e.target.value;
  
  // - Reload the appointments for that specific date
  loadAppointments();
});

// Function: loadAppointments
// Purpose: Fetch and display appointments based on selected date and optional patient name
async function loadAppointments() {
  try {
    // Step 1: Call getAllAppointments with selectedDate, patientName, and token
    const appointments = await getAllAppointments(selectedDate, patientName, token);
    
    // Step 2: Clear the table body content before rendering new rows
    tableBody.innerHTML = '';
    
    // Step 3: If no appointments are returned:
    if (!appointments || appointments.length === 0) {
      // - Display a message row: "No Appointments found for today."
      const messageRow = document.createElement('tr');
      messageRow.innerHTML = `
        <td colspan="5" class="text-center text-gray-500 py-4">
          No Appointments found for today.
        </td>
      `;
      tableBody.appendChild(messageRow);
      return;
    }
    
    // Step 4: If appointments exist:
    appointments.forEach(appointment => {
      // - Loop through each appointment and construct a 'patient' object with id, name, phone, and email
      const patient = {
        id: appointment.id,
        name: appointment.patientName || appointment.name,
        phone: appointment.patientPhone || appointment.phone,
        email: appointment.patientEmail || appointment.email
      };
      
      // - Call createPatientRow to generate a table row for the appointment
      const row = createPatientRow(patient);
      
      // - Append each row to the table body
      tableBody.appendChild(row);
    });
    
  } catch (error) {
    // Step 5: Catch and handle any errors during fetch:
    console.error('Error loading appointments:', error);
    
    // - Show a message row: "Error loading appointments. Try again later."
    tableBody.innerHTML = '';
    const errorRow = document.createElement('tr');
    errorRow.innerHTML = `
      <td colspan="5" class="text-center text-red-500 py-4">
        Error loading appointments. Try again later.
      </td>
    `;
    tableBody.appendChild(errorRow);
  }
}

// When the page is fully loaded (DOMContentLoaded):
document.addEventListener('DOMContentLoaded', () => {
  // - Call renderContent() (assumes it sets up the UI layout)
  renderContent();
  
  // - Call loadAppointments() to display today's appointments by default
  loadAppointments();
  
  // Set the date picker to today's date initially
  datePicker.value = selectedDate;
});
