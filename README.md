# Employee & Leave Management API Documentation

This document outlines how to set up the backend server, access the frontend, and interact with the available REST API endpoints.

---

## 🚀 Getting Started (Backend)

Assuming you have **Node.js** installed and the necessary files (`package.json`, `main.js`, `routers`, and `services`) are present, you can run the server using standard Node Package Manager (npm) commands.

* **Install Dependencies:**
    Navigate to the root directory of your project and install all required packages (like **express**).

    ```bash
    npm install
    ```

* **Start the Server:**
    Run the application using the designated start script (usually defined in `package.json`). The server will typically run on **http://localhost:8080** (or whichever port is configured).

    ```bash
    npm run dev
    ```

The server is now running and ready to handle API requests.

---

## 🌐 Accessing the Frontend

If your project includes a basic user interface for interacting with the API, it is likely contained within a single HTML file.

* **Open the Frontend:**
    Locate the **index.html** file in your project directory (or the designated public folder). You can open this file directly in any web browser.

    ```
    Open file://path/to/your/project/index.html
    ```

> (Note: For cross-origin requests, the browser must be able to communicate with the running backend server.)

---

## 🎯 Example API Usage

The backend provides endpoints for managing employee records and leave requests. The base URL for the API is assumed to be **http://localhost:8080** (or similar).

### 1. Employee Endpoints (`/employees`)

| Method | Path | Description |
| :--- | :--- | :--- |
| **GET** | `/employees` | Retrieve all employee records. |
| **GET** | `/employees/:id` | Retrieve a specific employee by ID (**UUID**). |
| **POST** | `/employees` | Add a new employee record. |
| **DELETE** | `/employees/:id` | Delete an employee record by ID (**UUID**). |

---

#### A. Get All Employees (`GET /employees`)

```http
GET /employees

Response (200 OK):
JSON

{
"statusCode": 200,
"data": [
{
"id": "b1d2c3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e",
"name": "Jane Doe",
"department": "Engineering",
"leaveBalance": 20
}
// ... other employees
],
"message": "Success"
}

B. Add New Employee (POST /employees)

This requires a JSON body containing the employee details, including an ID (UUID string), name (string), department (string), and leave balance (integer).
HTTP

POST /employees
Content-Type: application/json

{
"id": "e2c3d4f5-6a7b-4c8d-9e0f-1a2b3c4d5e6f",
"name": "Max Power",
"department": "Sales",
"leaveBalance": 15
}

Response (201 Created):
JSON

{
"statusCode": 201,
"message": "Success"
}

C. Delete Employee (DELETE /employees/:id)

Replace :id with the actual employee ID (UUID) you wish to remove.
HTTP

DELETE /employees/e2c3d4f5-6a7b-4c8d-9e0f-1a2b3c4d5e6f

Response (200 OK):
JSON

{
"statusCode": 200,
"message": "Success"
}

2. Leave Endpoints (/leaves)

Method	Path	Description
GET	/leaves	Retrieve all pending, approved, or failed leave requests.
POST	/leaves	Submit a new leave request (status must be PENDING).
PATCH	/leaves/:id/approve	Approve a specific leave request by ID (UUID).

A. Submit New Leave Request (POST /leaves)

This endpoint requires a JSON body. Note that the id and employeeId are UUID strings, and the status must be PENDING on creation.
HTTP

POST /leaves
Content-Type: application/json

{
"id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
"employeeId": "e2c3d4f5-6a7b-4c8d-9e0f-1a2b3c4d5e6f",
"startDate": "2024-06-15",
"endDate": "2024-06-17",
"reason": "Family vacation",
"status": "PENDING"
}

Response (201 Created):
JSON

{
"statusCode": 201,
"message": "Success"
}

B. Approve Leave Request (PATCH /leaves/:id/approve)

This action handles the logic for approval, including checking the employee's available leave balance and updating the status to APPROVED or FAIL. Replace :id with the leave request UUID.
HTTP

PATCH /leaves/a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d/approve

Response (200 OK):
JSON

{
"statusCode": 200,
"message": "Success"
}

    (If the employee is not found, or the leave balance is insufficient, a 400 Bad Request or 404 Not Found may be returned by the server logic.)


---
Let me know if you would like me to format any specific section of this document
