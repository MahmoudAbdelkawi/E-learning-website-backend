# E-learning Backend

Welcome to the backend repository of E-learning, a full stack application built with Node.js and Express. This project serves as the backend API for the E-learning frontend.

## Getting Started

To get started with the backend, follow these steps:

Clone the repository to your local machine.
Navigate to the project directory: cd E-learning-backend.
Install dependencies: npm install.
Create a .env file at the root of the project and set your environment variables, including the MONGODB_URI for database connection and other necessary configurations.
Start the server: npm start.
The backend API should now be running on http://localhost:5000, and it will be accessible by the frontend.

## API Documentation

For API documentation and usage, refer to the Postman collection associated with this project.

## Features

User authentication endpoints (sign up, login, forget password, confirmation code, change password).
Student endpoints (update image, view profile, view courses, search courses, enroll in courses, add reviews).
Teacher endpoints (add courses, view course details, view all courses, update course details, delete courses).
Database
This project uses MongoDB as the database. Make sure you have a MongoDB instance running and update the .env file with the correct connection URI.

## Contributing

If you want to contribute to the backend development of E-learning, follow these steps:

Fork the repository.
Create a new branch for your feature: git checkout -b feature-name.
Make your changes and test thoroughly.
Commit your changes: git commit -m "Your commit message".
Push to your fork: git push origin feature-name.
Create a pull request to the main branch of this repository.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

Please note that the README files may need further customization based on your specific project's structure, dependencies, and setup. These are just generic templates to get you started. Make sure to replace placeholders like {{URL}}, {{TOKEN}}, and others with the actual values used in your project. Also, ensure that the Postman collection link in the backend README is updated to the correct Postman collection URL for your project.




