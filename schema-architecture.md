Section 1: Architecture Summary

This Spring Boot application employs a hybrid architecture that combines both MVC and REST controller patterns to serve different 
user interfaces and functionalities. The Admin and Doctor dashboards utilize traditional MVC controllers with Thymeleaf templates 
to render server-side HTML pages, providing a rich web interface for administrative and medical staff. Meanwhile, 
all other application modules are served through RESTful APIs, enabling flexible client-server communication and supporting potential
mobile or single-page application frontends.

The application's data persistence strategy involves a dual-database approach to optimize for different data types and access patterns. 
MySQL serves as the primary relational database, storing structured data including patient records, doctor information, appointment schedules,
and administrative data through JPA entities. MongoDB complements this by handling prescription data as document models, which allows for 
more flexible schema design suitable for medical prescription information that may vary in structure. Both databases are accessed through
a unified service layer that abstracts the data access logic from the controllers, with services delegating to appropriate repository 
implementations based on the data source required.

Section 2: Numbered Flow of Data and Control

1. User accesses the application through either the AdminDashboard/Doctor dashboard pages or other application modules requiring API access.
2. The request is routed to the appropriate controller - either MVC controllers (for Admin/Doctor dashboards) or REST controllers
 (for all other modules) based on the endpoint accessed.
3. The controller receives the request and calls the corresponding method in the service layer, passing along any necessary parameters
   or request data.
4.The service layer processes the business logic and determines which repository to interact with based on the type of data needed
(MySQL for patient/doctor/appointment/admin data or MongoDB for prescriptions
5.The appropriate repository (JPA repository for MySQL entities or MongoDB repository for document models) executes the database operation
and returns the requested data or confirmation of data modification.
6.The service layer receives the repository response, applies any additional business logic or data transformation, and returns the processed
 result to the controller.
7. The controller formats the response appropriately - either rendering a Thymeleaf template with model data (for MVC controllers) or returning
   JSON data (for REST controllers) - and sends the final response back to the user.
