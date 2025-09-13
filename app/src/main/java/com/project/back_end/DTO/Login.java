package com.project.back_end.DTO;

public class Login {
    
    // 1. 'email' field:
    //    - Type: private String
    //    - Description:
    //      - Represents the email address used for logging into the system.
    //      - The email field is expected to contain a valid email address for user authentication purposes.
    private String email;

    // 2. 'password' field:
    //    - Type: private String
    //    - Description:
    //      - Represents the password associated with the email address.
    //      - The password field is used for verifying the user's identity during login.
    //      - It is generally hashed before being stored and compared during authentication.
    private String password;

    // 3. Constructor:
    //    - No explicit constructor is defined for this class, as it relies on the default constructor provided by Java.
    //    - This class can be initialized with setters or directly via reflection, as per the application's needs.
    
    // Default constructor (implicitly provided by Java)
    public Login() {
    }

    // Optional: Parameterized constructor for convenience
    public Login(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // 4. Getters and Setters:
    //    - Standard getter and setter methods are provided for both 'email' and 'password' fields.
    
    // The 'getEmail()' method allows access to the email value.
    public String getEmail() {
        return email;
    }

    // The 'setEmail(String email)' method sets the email value.
    public void setEmail(String email) {
        this.email = email;
    }

    // The 'getPassword()' method allows access to the password value.
    public String getPassword() {
        return password;
    }

    // The 'setPassword(String password)' method sets the password value.
    public void setPassword(String password) {
        this.password = password;
    }

    // Optional: toString method for debugging purposes
    @Override
    public String toString() {
        return "Login{" +
                "email='" + email + '\'' +
                ", password='[PROTECTED]'" + // Don't expose actual password in logs
                '}';
    }

    // Optional: equals and hashCode methods
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Login login = (Login) obj;
        
        if (email != null ? !email.equals(login.email) : login.email != null) return false;
        return password != null ? password.equals(login.password) : login.password == null;
    }

    @Override
    public int hashCode() {
        int result = email != null ? email.hashCode() : 0;
        result = 31 * result + (password != null ? password.hashCode() : 0);
        return result;
    }
}

/*
public class Login {
    
// 1. 'email' field:
//    - Type: private String
//    - Description:
//      - Represents the email address used for logging into the system.
//      - The email field is expected to contain a valid email address for user authentication purposes.

// 2. 'password' field:
//    - Type: private String
//    - Description:
//      - Represents the password associated with the email address.
//      - The password field is used for verifying the user's identity during login.
//      - It is generally hashed before being stored and compared during authentication.

// 3. Constructor:
//    - No explicit constructor is defined for this class, as it relies on the default constructor provided by Java.
//    - This class can be initialized with setters or directly via reflection, as per the application's needs.

// 4. Getters and Setters:
//    - Standard getter and setter methods are provided for both 'email' and 'password' fields.
//    - The 'getEmail()' method allows access to the email value.
//    - The 'setEmail(String email)' method sets the email value.
//    - The 'getPassword()' method allows access to the password value.
//    - The 'setPassword(String password)' method sets the password value.


}*/
