Here’s the updated API documentation for the specified endpoints:

```markdown
# 🌐 **Admin API Documentation**

## 🎥 **Demo Video**

Watch the full demo of the API in action:
[![Watch the video](https://img.youtube.com/vi/W3bwF-bFJLM/0.jpg)](https://www.youtube.com/watch?v=W3bwF-bFJLM)  
🎬 **Click to Play the Demo** 🎬

---

## 🌍 **Live Website**

🚀 You can access the live website here:  
[**Worko**](https://shik-worko.netlify.app/)  
👨‍💻 Explore the platform now! 👨‍💻

---

## **API Endpoints** 🚀

### **1. POST /auth/register**  
🔐 **Register a New User**  
Registers a new user and provides a response with user details.

#### **Request Body:**
```json
{
  "name": "testuser5",
  "email": "testuser5@example.com",
  "password": "password123",
  "resumeUrl": "https://drive.google.com/file/d/1oaEZkF0awp9gSF1LlYPn4eU8AfomWXTb/view"
}
```

#### **Response:**
- **200 OK**: 
  ```json
  {
    "message": "User registered successfully",
    "userId": "678a6c03acfa0dee7d5d8fa2"
  }
  ```

---

### **2. POST /auth/login**  
🔑 **Login to Your Account**  
Logs in a user and returns a JWT token for authentication.

#### **Request Body:**
```json
{
  "email": "admin@gmail.com",
  "password": "12345678"
}
```

#### **Response:**
- **200 OK**: 
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhhNjAwNmI4YjgwMzA1N2M0ZWUyMjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzEyNTQ2OCwiZXhwIjoxNzM3MjExODY4fQ.Pk1edmREIbwHQbKCWqr31D8wtGXIM5P28Ix7jXm0GLc",
    "user": {
      "id": "678a6006b8b803057c4ee222",
      "email": "admin@gmail.com",
      "username": "admin",
      "jobTitle": "developer"
    }
  }
  ```

---

### **3. GET /auth/me**  
👤 **Get User Data**  
Fetches the profile details of the currently logged-in user.

#### **Response:**
```json
{
  "id": "67890f58115df703ae589e1b",
  "name": "testuser3",
  "email": "testuser3@example.com",
  "role": "admin",
  "jobTitle": "developer"
}
```

---

### **4. POST /api/refer**  
🔗 **Refer User**  
Allows a user to refer another user. Requires Bearer token.

#### **Request Body:**
```json
{
  "referredUserId": "6788f34506dddc3be8491f8b"
}
```

#### **Response:**
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

---

### **5. GET /api/referrals**  
🔍 **Get Employee Referrals**  
Fetches the list of referrals for the logged-in user.

#### **Response:**
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
    },
    {
      "_id": "6789286f925df7f51b69ea53",
      "referrer": "67890f48115df703ae589e18",
      "referred": {
        "_id": "6788f34506dddc3be8491f8b",
        "name": "testuser",
        "email": "testuser@example.com",
        "jobTitle": "developer",
        "role": "emp"
      },
      "status": "pending",
      "createdAt": "2025-01-16T15:40:31.654Z"
    }
  ]
}
```

---

### **6. GET /api/users**  
👥 **Get All Users**  
Fetches a list of all users in the system.

#### **Response:**
```json
{
  "users": [
    {
      "_id": "678a6006b8b803057c4ee222",
      "name": "admin",
      "email": "admin@gmail.com",
      "jobTitle": "developer",
      "role": "admin",
      "resumeUrl": "https://drive.google.com/file/d/1oaEZkF0awp9gSF1LlYPn4eU8AfomWXTb/view?usp=drive_link",
      "created_at": "2025-01-17T13:49:58.025Z"
    },
    {
      "_id": "678a6070b8b803057c4ee225",
      "name": "user1",
      "email": "user2@gmail.com",
      "jobTitle": "developer",
      "role": "emp",
      "resumeUrl": "https://drive.google.com/file/d/1oaEZkF0awp9gSF1LlYPn4eU8AfomWXTb/view?usp=drive_link",
      "created_at": "2025-01-17T13:51:44.031Z"
    },
    {
      "_id": "678a60b4b8b803057c4ee229",
      "name": "user2",
      "email": "user1@gmail.com",
      "jobTitle": "developer",
      "role": "emp",
      "resumeUrl": "https://drive.google.com/file/d/1oaEZkF0awp9gSF1LlYPn4eU8AfomWXTb/view?usp=drive_link",
      "created_at": "2025-01-17T13:52:52.933Z"
    }
  ]
}
```

---

## 🎥 **Demo Video**

To view the API demo in action, click the link below:  
[![Watch the video](https://img.youtube.com/vi/W3bwF-bFJLM/0.jpg)](https://www.youtube.com/watch?v=W3bwF-bFJLM)  
🎬 **Click to Play the Demo** 🎬

---

## 🌍 **Live Website**

🚀 Explore the live website here:  
[**Worko**](https://shik-worko.netlify.app/)  
👨‍💻 Start using the platform now! 👨‍💻

---

### **Happy coding!** 😊🚀
```

This updated version incorporates the relevant API endpoints, their request and response formats, and some extra elements like demo video links and website access for clarity and engagement. Let me know if you need further adjustments!
