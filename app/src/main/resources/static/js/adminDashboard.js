// Admin Dashboard - Doctor Management

// Attach click listener to "Add Doctor" button
document.addEventListener('DOMContentLoaded', function() {
    // Load all doctor cards when page loads
    loadDoctorCards();
    
    // Add Doctor button click handler
    const addDoctorBtn = document.getElementById('addDoctorBtn');
    if (addDoctorBtn) {
        addDoctorBtn.addEventListener('click', function() {
            openModal('addDoctor');
        });
    }
    
    // Attach event listeners to search and filter elements
    attachFilterListeners();
});

/**
 * Function: loadDoctorCards
 * Purpose: Fetch all doctors and display them as cards
 */
async function loadDoctorCards() {
    try {
        // Call getDoctors() from the service layer
        const doctors = await getDoctors();
        
        // Clear the current content area
        const contentDiv = document.getElementById('doctorCardsContainer');
        if (contentDiv) {
            contentDiv.innerHTML = '';
            
            // For each doctor returned, create and append card
            doctors.forEach(doctor => {
                const doctorCard = createDoctorCard(doctor);
                contentDiv.appendChild(doctorCard);
            });
        }
    } catch (error) {
        // Handle any fetch errors by logging them
        console.error('Error loading doctor cards:', error);
    }
}

/**
 * Attach 'input' and 'change' event listeners to search bar and filter dropdowns
 */
function attachFilterListeners() {
    const searchBar = document.getElementById('doctorSearchBar');
    const timeFilter = document.getElementById('timeFilter');
    const specialtyFilter = document.getElementById('specialtyFilter');
    
    if (searchBar) {
        searchBar.addEventListener('input', filterDoctorsOnChange);
    }
    
    if (timeFilter) {
        timeFilter.addEventListener('change', filterDoctorsOnChange);
    }
    
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', filterDoctorsOnChange);
    }
}

/**
 * Function: filterDoctorsOnChange
 * Purpose: Filter doctors based on name, available time, and specialty
 */
async function filterDoctorsOnChange() {
    try {
        // Read values from the search bar and filters
        const searchBar = document.getElementById('doctorSearchBar');
        const timeFilter = document.getElementById('timeFilter');
        const specialtyFilter = document.getElementById('specialtyFilter');
        
        // Normalize empty values to null
        const name = searchBar?.value.trim() || null;
        const time = timeFilter?.value || null;
        const specialty = specialtyFilter?.value || null;
        
        // Call filterDoctors from the service
        const filteredDoctors = await filterDoctors(name, time, specialty);
        
        const contentDiv = document.getElementById('doctorCardsContainer');
        
        if (filteredDoctors && filteredDoctors.length > 0) {
            // Render filtered doctors using createDoctorCard()
            renderDoctorCards(filteredDoctors);
        } else {
            // Show message when no doctors match the filter
            if (contentDiv) {
                contentDiv.innerHTML = '<div class="no-results">No doctors found with the given filters.</div>';
            }
        }
    } catch (error) {
        // Catch and display any errors with an alert
        alert('Error filtering doctors: ' + error.message);
        console.error('Filter error:', error);
    }
}

/**
 * Function: renderDoctorCards
 * Purpose: A helper function to render a list of doctors passed to it
 */
function renderDoctorCards(doctors) {
    // Clear the content area
    const contentDiv = document.getElementById('doctorCardsContainer');
    if (contentDiv) {
        contentDiv.innerHTML = '';
        
        // Loop through the doctors and append each card to the content area
        doctors.forEach(doctor => {
            const doctorCard = createDoctorCard(doctor);
            contentDiv.appendChild(doctorCard);
        });
    }
}

/**
 * Function: adminAddDoctor
 * Purpose: Collect form data and add a new doctor to the system
 */
async function adminAddDoctor() {
    try {
        // Collect input values from the modal form
        const name = document.getElementById('doctorName')?.value.trim();
        const email = document.getElementById('doctorEmail')?.value.trim();
        const phone = document.getElementById('doctorPhone')?.value.trim();
        const password = document.getElementById('doctorPassword')?.value;
        const specialty = document.getElementById('doctorSpecialty')?.value;
        const availableTimes = document.getElementById('doctorAvailableTimes')?.value;
        
        // Basic validation
        if (!name || !email || !phone || !password || !specialty) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Retrieve the authentication token from localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Authentication token not found. Please log in again.');
            return;
        }
        
        // Build a doctor object with the form values
        const doctor = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            specialty: specialty,
            availableTimes: availableTimes
        };
        
        // Call saveDoctor from the service
        const result = await saveDoctor(doctor, token);
        
        if (result) {
            // Show success message
            alert('Doctor added successfully!');
            
            // Close the modal and reload the page
            closeModal('addDoctor');
            location.reload();
        }
    } catch (error) {
        // Show error message if saving fails
        alert('Error adding doctor: ' + error.message);
        console.error('Add doctor error:', error);
    }
}

// Make adminAddDoctor available globally for form submission
window.adminAddDoctor = adminAddDoctor;
