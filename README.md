# SmartTask – Personal Task Management System
## Table of Contents
- [Project Overview](#project-overview)
- [Business Description](#business-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend](#backend)
- [Frontend](#frontend)
- [APIs](#apis)
- [How to Run](#how-to-run)
- [Screenshots](#screenshots)
- [Notes](#notes)

---

## Project Overview
**SmartTask** is a lightweight **Task Management System** for modern professionals.  
It allows users to create, edit, delete, and track tasks, with features such as:

- Status tracking (Pending, In Progress, Completed)
- Priority levels (Low, Medium, High)
- Due dates and deadlines
- Filter tasks by status or priority
- Optional progress overview

This project is built as a **full-stack MERN (MongoDB, Express, React, Node.js)** application.

---

## Business Description
Modern professionals juggle multiple responsibilities daily.  
Companies want to provide a **personal productivity portal** to employees or clients where they can:

- Maintain personal tasks
- Track completion progress
- Filter or view tasks based on priority and due date

SmartTask makes this lightweight, accessible, and intuitive.

---

## Features

Frontend:
- Secure Login and Registration pages
- Dashboard to view tasks
- Add / Edit / Delete tasks
- Filters (Status, Priority)
- Optional Progress Bar (percentage completed)
- Responsive UI

Backend:
- REST APIs for /register, /login and /tasks (CRUD)
- JWT authentication
- Validation and structured error responses

Database:
- MongoDB with Users and Tasks collections
- One-to-many relation: User → Tasks
- Example Task document:

```json
{
  "title": "Task title",
  "description": "Task description",
  "status": "Pending",
  "priority": "Medium",
  "due_date": "YYYY-MM-DD",
  "created_at": "2025-10-13T00:00:00.000Z"
}
```

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT (JSON Web Tokens)
- Styling: Inline CSS + basic responsive design
- Others: ESLint for code linting

## Project Structure

- smarttask/
- │
- ├─ backend/
- │  ├─ controllers/
- │  │   ├─ authController.js
- │  │   └─ taskController.js
- │  ├─ middleware/
- │  │   └─ auth.js
- │  ├─ models/
- │  │   ├─ User.js
- │  │   └─ Task.js
- │  ├─ routes/
- │  │   ├─ auth.js
- │  │   └─ tasks.js
- │  ├─ server.js
- │  └─ .env
- │
- ├─ frontend/
- │  ├─ src/
- │  │   ├─ components/
- │  │   │   ├─ Navbar.js
- │  │   │   ├─ TaskForm.js
- │  │   │   ├─ TaskList.js
- │  │   │   ├─ TaskFilters.js
- │  │   │   └─ ProgressBar.js
- │  │   ├─ pages/
- │  │   │   ├─ Dashboard.js
- │  │   │   ├─ Login.js
- │  │   │   └─ Register.js
- │  │   ├─ services/
- │  │   │   └─ api.js
- │  │   └─ App.js
- │  └─ package.json
- └─ README.md

## Backend

Main Features:

User Authentication:

POST /register → register new user

POST /login → login and receive JWT token

Task Management (CRUD):

POST /tasks → create task

GET /tasks → fetch all tasks of the user

PUT /tasks/:id → update task (Edit)

DELETE /tasks/:id → delete task

Optional filter: GET /tasks?status=Pending&priority=High

JWT Authentication Middleware:

Protects /tasks routes

Sets req.userId to identify tasks belonging to the user

Models:

User: name, email, password (hashed), createdAt

Task: user, title, description, status, priority, due_date, created_at

## Frontend

Components:

Navbar.js — Navigation bar with Dashboard link and Logout button.

TaskForm.js — Add / Edit task form (controlled inputs, editingTask prop to prefill form)

TaskList.js — Displays list of tasks with Edit/Delete actions

TaskFilters.js — Dropdowns to filter tasks by status or priority

ProgressBar.js (Optional) — Displays % tasks completed

Pages:

Login.js → login form, saves JWT token to localStorage

Register.js → registration form, redirects to login on success

Dashboard.js → main page with TaskForm, TaskFilters, TaskList, and ProgressBar

API Service (api.js):

Axios instance with baseURL (http://localhost:5000)

Interceptor attaches Authorization: Bearer <token>

## API Endpoints

| Method | Endpoint | Description | Auth Required |
| ------ | -------- | ----------- | ------------- |
| POST | /register | Create new user | No |
| POST | /login | Login user & get token | No |
| GET | /tasks | Fetch all tasks of user | Yes |
| POST | /tasks | Create new task | Yes |
| PUT | /tasks/:id | Update task | Yes |
| DELETE | /tasks/:id | Delete task | Yes |

## How to Run

Backend:

```powershell
cd backend
npm install
# create .env with MONGO_URI and JWT_SECRET (or copy .env.example)
node server.js
```

Frontend:

```powershell
cd frontend
npm install
npm start
```

Access frontend at: http://localhost:3000

Ensure backend is running on http://localhost:5000

## Notes

- Editing Tasks: Click Edit on any task → form fills → click Update Task.
- JWT Tokens: Stored in localStorage and automatically attached to all API requests.
- Filters: Status and priority filters apply instantly to the task list.
- Progress Bar: Optional, shows task completion percentage.

Common Issues:

- Ensure await calls are inside async functions.
- Match backend field names (due_date, priority) exactly.
- Make sure TaskForm has export default TaskForm.

## Screenshots
- <img width="1892" height="857" alt="image" src="https://github.com/user-attachments/assets/5043140e-616d-4fbb-a391-327dd67d2ff8" />
- <img width="681" height="456" alt="image" src="https://github.com/user-attachments/assets/aedd895d-4c88-4eb2-aff0-61922f36db3a" />
- <img width="555" height="457" alt="image" src="https://github.com/user-attachments/assets/2b584940-cb37-46da-8700-0d90cc1bc1db" />














#
