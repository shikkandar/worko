Certainly! Here’s the updated API documentation with all 9 endpoints fully included, as per your request:

---

# Project Name: Job Referal Management System

## Overview

This project is a User Management System that allows users to register, log in, refer other users, and view user data. The system supports JWT authentication, referral functionalities, and an admin interface for managing users.

## Admin Login Credentials

```json
{
  "email": "admin@gmail.com",
  "password": "12345678"
}
```

## 🎥 **Demo Video Kindly watch this**

Watch the full demo of the API in action:  
[![Watch the video](https://img.youtube.com/vi/W3bwF-bFJLM/0.jpg)](https://www.youtube.com/watch?v=W3bwF-bFJLM)  
🎬 **Click to Play the Demo** 🎬

## 🌍 **Live Website**

🚀 You can access the live website here:  
[**Worko**](https://shik-worko.netlify.app/)  
👨‍💻 Explore the platform now! 👨‍💻

---

## **API Endpoints** 🚀

Here’s a full list of the API endpoints and their descriptions:

### 1. **Register User**
- **Endpoint:** `POST /auth/register`
- **Request Body:**
  ```json
  {
    "name": "testuser5",
    "email": "testuser5@example.com",
    "password": "password123",
    "resumeUrl": "https://drive.google.com/file/d/1oaEZkF0awp9gSF1LlYPn4eU8AfomWXTb/view"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "userId": "678a6c03acfa0dee7d5d8fa2"
  }
  ```

### 2. **Login User**
- **Endpoint:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "email": "admin@gmail.com",
    "password": "12345678"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "678a6006b8b803057c4ee222",
      "email": "admin@gmail.com",
      "username": "admin",
      "jobTitle": "developer"
    }
  }
  ```

### 3. **Get User Data**
- **Endpoint:** `GET /auth/me`
- **Authorization:** Bearer token
- **Response:**
  ```json
  {
    "id": "67890f58115df703ae589e1b",
    "name": "testuser3",
    "email": "testuser3@example.com",
    "role": "admin",
    "jobTitle": "developer"
  }
  ```

### 4. **Refer User**
- **Endpoint:** `POST /api/refer`
- **Authorization:** Bearer token
- **Request Body:**
  ```json
  {
    "referredUserId": "6788f34506dddc3be8491f8b"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User referred successfully",
    "referral": {
      "id": "678a6f39acfa0dee7d5d8fb3",
      "referrer": "678a6006b8b803057c4ee222",
      "referred": "678a6c03acfa0dee7d5d8fa2",
      "status": "pending"
    }
  }
  ```

### 5. **Get Employee Referrals**
- **Endpoint:** `GET /api/referrals`
- **Authorization:** Bearer token
- **Response:**
  ```json
  {
    "message": "Referrals retrieved successfully",
    "referrals": [
      {
        "_id": "678926ba30600566659a115d",
        "referrer": "67890f48115df703ae589e18",
        "referred": {
          "_id": "6789268730600566659a114d",
          "name": "testuser4",
          "email": "testuser4@example.com",
          "jobTitle": "developer",
          "role": "user"
        },
        "status": "pending",
        "createdAt": "2025-01-16T15:33:14.590Z"
      }
    ]
  }
  ```

### 6. **Get All Users**
- **Endpoint:** `GET /api/users`
- **Authorization:** Bearer token
- **Response:**
  ```json
  {
    "users": [
      {
        "_id": "678a6006b8b803057c4ee222",
        "name": "admin",
        "email": "admin@gmail.com",
        "jobTitle": "developer",
        "role": "admin",
        "resumeUrl": "https://drive.google.com/file/d/1oaEZkF0awp9gSF1LlYPn4eU8AfomWXTb/view?usp=drive_link"
      },
      {
        "_id": "678a6070b8b803057c4ee225",
        "name": "user1",
        "email": "user2@gmail.com",
        "jobTitle": "developer",
        "role": "emp",
        "resumeUrl": "https://drive.google.com/file/d/1oaEZkF0awp9gSF1LlYPn4eU8AfomWXTb/view?usp=drive_link"
      }
    ]
  }
  ```

### 7. **Get All Referrals**
- **Endpoint:** `GET /referrals`
- **Authorization:** Bearer token (JWT)
- **Response:**
  ```json
  {
    "referrals": [
      {
        "_id": "678a62edb8b803057c4ee271",
        "referrer": {
          "_id": "678a6006b8b803057c4ee222",
          "name": "admin",
          "email": "admin@gmail.com",
          "jobTitle": "developer",
          "role": "admin",
          "resumeUrl": "https://drive.google.com/file/d/1oaEZkF0awp9gSF1LlYPn4eU8AfomWXTb/view?usp=drive_link"
        },
        "referred": {
          "_id": "678a6070b8b803057c4ee225",
          "name": "user1",
          "email": "user2@gmail.com",
          "jobTitle": "developer",
          "role": "emp",
          "resumeUrl": "https://drive.google.com/file/d/1oaEZkF0awp9gSF1LlYPn4eU8AfomWXTb/view?usp=drive_link"
        },
        "status": "accepted",
        "createdAt": "2025-01-17T14:02:21.175Z"
      }
    ]
  }
  ```

### 8. **Update User Role**
- **Endpoint:** `POST /user-role`
- **Authorization:** Bearer token (JWT)
- **Request Body:**
  ```json
  {
    "userId": "6788f34506dddc3be8491f8b",
    "newRole": "user"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User role updated successfully",
    "user": {
      "_id": "6788f34506dddc3be8491f8b",
      "name": "testuser",
      "email": "testuser@example.com",
      "jobTitle": "developer",
      "role": "user"
    }
  }
  ```

### 9. **Update Referral Status**
- **Endpoint:** `POST /referral-status`
- **Authorization:** Bearer token (JWT)
- **Request Body:**
  ```json
  {
    "referralId": "678a673ab8b803057c4ee2dc",
    "newStatus": "accepted"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Referral status updated successfully",
    "referral": {
      "_id": "678a673ab8b803057c4ee2dc",
      "referrer": "678a60d5b8b803057c4ee22c",
      "referred": "678a60e0b8b803057c4ee22f",
      "status": "accepted",
      "createdAt": "2025-01-17T14:20:42.332Z"
    }
  }
  ```

---

## **Technologies Used**

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Frontend:** React (Optional, depending on project scope)
- **Others:** Google Drive for resume URLs

---

## **Setup and Installation**

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add the following:
   ```bash
   JWT_SECRET=<your_jwt_secret>
   MONGO_URI=<your_mongo_db_uri>
   ```

4. Run the application:
   ```bash
   npm start
   ```

---

## **Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This includes all 9 endpoints as requested, and each has its detailed description and usage.
