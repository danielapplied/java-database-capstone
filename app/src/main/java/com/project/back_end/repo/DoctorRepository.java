package com.project.back_end.repo;

import com.project.back_end.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    /**
     * Finds a doctor by their email address
     * @param email the email to search for
     * @return Doctor entity or null if not found
     */
    Doctor findByEmail(String email);
    
    /**
     * Finds doctors whose name contains the provided search string (case-sensitive)
     * Uses LIKE operator with wildcards for partial matching
     * @param name the name pattern to search for
     * @return List of doctors matching the name pattern
     */
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE CONCAT('%', :name, '%')")
    List<Doctor> findByNameLike(@Param("name") String name);
    
    /**
     * Finds doctors by name (case-insensitive partial match) and specialty (case-insensitive exact match)
     * @param name the name to search for (partial match)
     * @param specialty the specialty to match exactly
     * @return List of doctors matching both criteria
     */
    List<Doctor> findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(String name, String specialty);
    
    /**
     * Finds doctors by specialty, ignoring case sensitivity
     * @param specialty the specialty to search for
     * @return List of doctors with the specified specialty
     */
    List<Doctor> findBySpecialtyIgnoreCase(String specialty);
    
    // Additional useful methods you might want to consider:
    
    /**
     * Finds all doctors ordered by name
     * @return List of all doctors sorted by name
     */
    List<Doctor> findAllByOrderByNameAsc();
    
    /**
     * Finds doctors by specialty with ordering
     * @param specialty the specialty to search for
     * @return List of doctors with the specified specialty, ordered by name
     */
    List<Doctor> findBySpecialtyIgnoreCaseOrderByNameAsc(String specialty);
    
    /**
     * Checks if a doctor exists with the given email
     * @param email the email to check
     * @return true if doctor exists, false otherwise
     */
    boolean existsByEmail(String email);
}

/*
public interface DoctorRepository {
   // 1. Extend JpaRepository:
//    - The repository extends JpaRepository<Doctor, Long>, which gives it basic CRUD functionality.
//    - This allows the repository to perform operations like save, delete, update, and find without needing to implement these methods manually.
//    - JpaRepository also includes features like pagination and sorting.

// Example: public interface DoctorRepository extends JpaRepository<Doctor, Long> {}

// 2. Custom Query Methods:

//    - **findByEmail**:
//      - This method retrieves a Doctor by their email.
//      - Return type: Doctor
//      - Parameters: String email

//    - **findByNameLike**:
//      - This method retrieves a list of Doctors whose name contains the provided search string (case-sensitive).
//      - The `CONCAT('%', :name, '%')` is used to create a pattern for partial matching.
//      - Return type: List<Doctor>
//      - Parameters: String name

//    - **findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase**:
//      - This method retrieves a list of Doctors where the name contains the search string (case-insensitive) and the specialty matches exactly (case-insensitive).
//      - It combines both fields for a more specific search.
//      - Return type: List<Doctor>
//      - Parameters: String name, String specialty

//    - **findBySpecialtyIgnoreCase**:
//      - This method retrieves a list of Doctors with the specified specialty, ignoring case sensitivity.
//      - Return type: List<Doctor>
//      - Parameters: String specialty

// 3. @Repository annotation:
//    - The @Repository annotation marks this interface as a Spring Data JPA repository.
//    - Spring Data JPA automatically implements this repository, providing the necessary CRUD functionality and custom queries defined in the interface.

}*/
