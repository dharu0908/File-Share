# FileShare - Full Stack File Sharing Application

A full-stack file sharing platform that allows users to securely upload, send, and manage files through a web interface. This project is built using **Node.js (Express)** for the backend and **React** for the frontend.

---

## 📌 About the Project

FileShare is a secure and user-friendly file sharing system designed to streamline document exchange between users. It supports authentication, file uploads, and email notifications for sharing documents. Users can view files they’ve uploaded, sent, or received, all through an intuitive interface. The project follows a modular backend API structure and uses JWT for access protection.

### Key Features

- **User Authentication:** Secure signup and login using JWT for stateless authentication.
- **File Upload:** Supports multiple file types (images, PDFs, etc.) with size and type validations.
- **Send Files:** Send files directly to other registered users with email notifications.
- **File Management:** View history of uploaded, sent, and received files in separate sections.
- **Profile Dashboard:** Overview of total uploads, files sent, and files received by the user.
- **Email Notifications:** Automatic email alerts when a file is shared.
- **Security:** API routes are protected with JWT, and file uploads are filtered by MIME type to prevent harmful uploads.
- **Scalability:** Uses MongoDB for flexible, scalable data storage.

---

## 🛠️ Technologies Used

- **Backend:**
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment for server-side development.
  - [Express.js](https://expressjs.com/) - Web framework for building RESTful APIs.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing user and file data.
  - [Mongoose](https://mongoosejs.com/) - ODM for MongoDB to define schemas and interact with the database.
  - [Multer](https://github.com/expressjs/multer) - Middleware for handling multipart/form-data, used for file uploads.
  - [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken) - For secure token-based authentication.
  - [Nodemailer](https://nodemailer.com/) - For sending email notifications to users.

- **Frontend:**
  - [React](https://reactjs.org/) - JavaScript library for building interactive user interfaces.
  - [Axios](https://axios-http.com/) - Promise-based HTTP client for browser and Node.js to communicate with backend.
  - [React Router](https://reactrouter.com/) - For navigation and routing in the React app.

- **Other Tools:**
  - Git and GitHub for version control and repository hosting.
  - VS Code as the development environment.

---

## 🖼️ Screenshots

### 🏠 Home Page
![Home](Screenshot%202025-07-02%20203709.png)

### 📊 Status / Dashboard
![Status](Screenshot%202025-07-02%20203739.png)

### 📤 Send File
![Send File](Screenshot%202025-07-02%20203812.png)

### 👤 Profile Page
![Profile](Screenshot%202025-07-02%20204044.png)

### 📥 Received Files
![Received Files](Screenshot%202025-07-02%20204113.png)

### 🔐 Login Page
![Login Page](Screenshot%202025-07-07%20123716.png)

---

## ✍️ Author

**Dharmik Patel**  
[GitHub Profile](https://github.com/dharu0908)

---
