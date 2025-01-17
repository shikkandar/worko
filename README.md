Here's a more visually appealing version of your `README.md` file with improved formatting, styling, and sections for better readability and engagement:

```markdown
# 🚀 **Worko API Documentation**

Welcome to the **Worko API Documentation**! This guide provides everything you need to know about the endpoints, authentication, and testing for the Worko API.

---

## 🌐 **Base URL**
Replace `{BASE_URL}` with your API's base URL, such as:

- Local: `http://localhost:3000`
- Production: `https://your-deployed-api.com`

---

## 🔑 **Authentication**
Most endpoints require a valid JWT token. Include it in the `Authorization` header as follows:

```plaintext
Authorization: Bearer {YOUR_JWT_TOKEN}
```

---

## 📋 **Endpoints**

### **1. Authentication**

#### 🔐 User Registration
- **Endpoint**: `POST {BASE_URL}/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "jobTitle": "Software Engineer",
    "resumeUrl": "https://example.com/resume.pdf"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "userId": "user_id_here"
  }
  ```

#### 🔓 User Login
- **Endpoint**: `POST {BASE_URL}/auth/login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "your_jwt_token_here",
    "user": {
      "id": "user_id_here",
      "email": "john@example.com",
      "name": "John Doe",
      "jobTitle": "Software Engineer"
    }
  }
  ```

#### 🛡️ Get Current User Data
- **Endpoint**: `GET {BASE_URL}/auth/me`
- **Headers**: Authorization required
- **Response**:
  ```json
  {
    "id": "user_id_here",
    "email": "john@example.com",
    "name": "John Doe",
    "jobTitle": "Software Engineer",
    "role": "emp",
    "resumeUrl": "https://example.com/resume.pdf"
  }
  ```

---

### **2. User Management**

#### 👥 Get All Users
- **Endpoint**: `GET {BASE_URL}/api/users`
- **Headers**: Authorization required (Admin/Employee)
- **Response**:
  ```json
  [
    {
      "id": "user_id_1",
      "name": "John Doe",
      "email": "john@example.com",
      "jobTitle": "Software Engineer",
      "role": "emp"
    },
    {
      "id": "user_id_2",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "jobTitle": "Product Manager",
      "role": "admin"
    }
  ]
  ```

---

### **3. Referral Management**

#### 🤝 Refer a User
- **Endpoint**: `POST {BASE_URL}/api/refer`
- **Headers**: Authorization required
- **Request Body**:
  ```json
  {
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "jobTitle": "UX Designer",
    "resume": "base64_encoded_resume_file"
  }
  ```
- **Response**:
  ```json
  {
    "id": "referral_id_here",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "jobTitle": "UX Designer",
    "status": "pending",
    "referredBy": "user_id_of_referrer",
    "createdAt": "2023-06-01T12:00:00Z"
  }
  ```

#### 🗑️ Delete a Referral
- **Endpoint**: `DELETE {BASE_URL}/api/referrals/{referralId}`
- **Headers**: Authorization required
- **Response**:
  ```json
  {
    "message": "Referral deleted successfully"
  }
  ```

---

### **4. Admin Endpoints**

#### 📜 Get All Referrals
- **Endpoint**: `GET {BASE_URL}/api/admin/referrals`
- **Headers**: Authorization required (Admin only)
- **Response**:
  ```json
  [
    {
      "id": "referral_id_1",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "jobTitle": "UX Designer",
      "status": "pending",
      "referredBy": "user_id_1",
      "createdAt": "2023-06-01T12:00:00Z"
    },
    {
      "id": "referral_id_2",
      "name": "Bob Williams",
      "email": "bob@example.com",
      "jobTitle": "Data Scientist",
      "status": "accepted",
      "referredBy": "user_id_2",
      "createdAt": "2023-05-28T10:00:00Z"
    }
  ]
  ```

#### 🛠️ Update User Role
- **Endpoint**: `PUT {BASE_URL}/api/admin/user-role`
- **Request Body**:
  ```json
  {
    "userId": "user_id_here",
    "newRole": "emp"
  }
  ```
- **Response**:
  ```json
  {
    "id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "emp"
  }
  ```

---

## 🛠️ **Error Responses**
All endpoints can return the following errors:

- **400**: Bad Request (Invalid input)
- **401**: Unauthorized (Invalid or missing token)
- **403**: Forbidden (No access permission)
- **404**: Not Found (Resource not found)
- **500**: Internal Server Error (Unexpected error)

---

## 🧪 **Testing with Postman**

1. **Set Up Environment**:
   - Add a variable `BASE_URL` with your API base URL.
2. **Create Requests**:
   - Add each endpoint as a request.
3. **Authorization**:
   - Include the Authorization header for protected routes.
4. **Send Requests**:
   - Test various endpoints with valid and invalid data.

---

## 🎉 **Contributing**

We welcome contributions to improve the API. Feel free to submit pull requests or report issues!

---

## 📞 **Contact**

For support or inquiries, email us at [support@worko.com](mailto:support@worko.com).

---

Make your Worko experience seamless! 🚀
```

### Key Enhancements:
1. **Emojis**: Added emojis for sections to make the document visually engaging.
2. **Sections**: Structured content into clear, concise sections with headings.
3. **Highlights**: Added code blocks for clarity in request/response examples.
4. **Callouts**: Used bold text for important notes and endpoints.
5. **Testing Instructions**: Detailed steps for Postman testing.
6. **Contact & Contribution**: Added sections for community engagement.

Copy this content into your `README.md` file for a professional and appealing API documentation.
