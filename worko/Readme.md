# Worko API Documentation

This document provides comprehensive information on how to use and test the Worko API endpoints.

## Base URL

Replace `{BASE_URL}` with your actual API base URL (e.g., `http://localhost:3000` or your deployed API URL).

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

Authorization: Bearer {YOUR_JWT_TOKEN}

## Endpoints

### Authentication

#### 1. User Registration

- **URL**: `{BASE_URL}/auth/register`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "jobTitle": "Software Engineer",
    "resumeUrl": "https://example.com/path/to/resume.pdf"
  }
  Response:
  {
  "message": "User registered successfully",
  "userId": "user_id_here"
  }
  Notes:
  The resumeUrl field is optional and should contain a valid URL to the user's resume.
  Ensure that the resume is already uploaded to a file storage service before sending this request.
  ```

2. User Login
   URL: {BASE_URL}/auth/login
   Method: POST
   Body:
   {
   "email": "john@example.com",
   "password": "securepassword123"
   }
   Response:
   {
   "message": "Login successful",
   "token": "your_jwt_token_here",
   "user": {
   "id": "user_id_here",
   "email": "john@example.com",
   "username": "John Doe",
   "jobTitle": "Software Engineer"
   }
   }
3. Get Current User Data
   URL: {BASE_URL}/auth/me
   Method: GET
   Headers: Authorization token required
   Response:
   {
   "id": "user_id_here",
   "email": "john@example.com",
   "name": "John Doe",
   "jobTitle": "Software Engineer",
   "role": "emp",
   "resumeUrl": "https://example.com/path/to/resume.pdf"
   }
   User Management
4. Get All Users (Admin/Employee)
   URL: {BASE_URL}/api/users
   Method: GET
   Headers: Authorization token required (Admin or Employee)
   Response: Returns a list of all users
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
   Referral Management
5. Refer a User (Employee/Admin)
   URL: {BASE_URL}/api/refer
   Method: POST
   Headers: Authorization token required (Employee or Admin)
   Body:
   {
   "name": "Alice Johnson",
   "email": "alice@example.com",
   "jobTitle": "UX Designer",
   "resume": "base64_encoded_resume_file"
   }
   Response: Returns the created referral data
   {
   "id": "referral_id_here",
   "name": "Alice Johnson",
   "email": "alice@example.com",
   "jobTitle": "UX Designer",
   "status": "pending",
   "referredBy": "user_id_of_referrer",
   "createdAt": "2023-06-01T12:00:00Z"
   }
6. Unrefer a User (Employee/Admin)
   URL: {BASE_URL}/api/referrals/{referralId}
   Method: PUT
   Headers: Authorization token required (Employee or Admin)
   Response: Returns updated referral data
   {
   "id": "referral_id_here",
   "name": "Alice Johnson",
   "email": "alice@example.com",
   "jobTitle": "UX Designer",
   "status": "withdrawn",
   "referredBy": "user_id_of_referrer",
   "updatedAt": "2023-06-02T12:00:00Z"
   }
7. Delete a Referral (Employee/Admin)
   URL: {BASE_URL}/api/referrals/{referralId}
   Method: DELETE
   Headers: Authorization token required (Employee or Admin)
   Response: Confirmation of referral deletion
   {
   "message": "Referral deleted successfully"
   }
8. Get All Referrals for Employee (Employee/Admin)
   URL: {BASE_URL}/api/referrals
   Method: GET
   Headers: Authorization token required (Employee or Admin)
   Response: Returns a list of referrals for the authenticated employee
   [
   {
   "id": "referral_id_1",
   "name": "Alice Johnson",
   "email": "alice@example.com",
   "jobTitle": "UX Designer",
   "status": "pending",
   "createdAt": "2023-06-01T12:00:00Z"
   },
   {
   "id": "referral_id_2",
   "name": "Bob Williams",
   "email": "bob@example.com",
   "jobTitle": "Data Scientist",
   "status": "accepted",
   "createdAt": "2023-05-28T10:00:00Z"
   }
   ]
   Admin-specific Endpoints
9. Get All Referrals (Admin only)
   URL: {BASE_URL}/api/admin/referrals
   Method: GET
   Headers: Authorization token required (Admin only)
   Response: Returns a list of all referrals
   [
   {
   "id": "referral_id_1",
   "name": "Alice Johnson",
   "email": "alice@example.com",
   "jobTitle": "UX Designer",
   "status": "pending",
   "referredBy": "user_id_of_referrer_1",
   "createdAt": "2023-06-01T12:00:00Z"
   },
   {
   "id": "referral_id_2",
   "name": "Bob Williams",
   "email": "bob@example.com",
   "jobTitle": "Data Scientist",
   "status": "accepted",
   "referredBy": "user_id_of_referrer_2",
   "createdAt": "2023-05-28T10:00:00Z"
   }
   ]
10. Update User Role (Admin only)
    URL: {BASE_URL}/api/admin/user-role
    Method: PUT
    Headers: Authorization token required (Admin only)
    Body:
    {
    "userId": "user_id_here",
    "newRole": "emp"
    }
    Response: Returns updated user data
    {
    "id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "jobTitle": "Software Engineer",
    "role": "emp"
    }
11. Update Referral Status (Admin only)
    URL: {BASE_URL}/api/admin/referral-status
    Method: PUT
    Headers: Authorization token required (Admin only)
    Body:
    {
    "referralId": "referral_id_here",
    "newStatus": "accepted"
    }
    Response: Returns updated referral data
    {
    "id": "referral_id_here",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "jobTitle": "UX Designer",
    "status": "accepted",
    "referredBy": "user_id_of_referrer",
    "updatedAt": "2023-06-03T14:00:00Z"
    }
12. Delete Referral (Admin only)
    URL: {BASE_URL}/api/admin/referral/{referralId}
    Method: DELETE
    Headers: Authorization token required (Admin only)
    Response: Confirmation of referral deletion
    {
    "message": "Referral deleted successfully"
    }
    Error Responses
    All endpoints may return the following error responses:
    400 Bad Request: Invalid input data
    401 Unauthorized: Missing or invalid authentication token
    403 Forbidden: User doesn't have permission to access the resource
    404 Not Found: Requested resource not found
    500 Internal Server Error: Unexpected server error
    For specific error messages, refer to the response body of the error.
    Testing with Postman
13. Set up a new environment in Postman and add a variable for BASE_URL.
14. Create a new request for each endpoint.
15. Set the appropriate HTTP method and URL for each request.
16. For authenticated requests, add the Authorization header with the JWT token.
17. For POST and PUT requests, set the request body to raw JSON and include the required data.
18. Send the request and check the response.
    Remember to handle the JWT token securely and never share it publicly.

This updated documentation provides a comprehensive overview of all your API endpoints, including request and response formats, authentication requirements, and error handling. It should give users of your API a clear understanding of how to interact with each endpoint and what to expect in return.
Workspace indexing: Done
