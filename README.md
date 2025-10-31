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
| **GET** | `/api/employees` | Retrieve all employee records. |
| **GET** | `/api/employees/:id` | Retrieve a specific employee by ID (**UUID**). |
| **POST** | `/api/employees` | Add a new employee record. |
| **DELETE** | `/api/employees/:id` | Delete an employee record by ID (**UUID**). |

---
### 2. Leave Endpoints (/leaves)

| Method | Path	| Description |
| :--- | :--- | :--- |
| **GET** | `/api/leaves` |	Retrieve all pending, approved, or failed leave requests. |
| **POST** | `/api/leaves` | Submit a new leave request (status must be **PENDING**). |
| **PATCH** | `/api/leaves/:id/approve` | Approve a specific leave request by ID (**UUID**). |
