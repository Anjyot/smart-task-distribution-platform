Here is the **DIRECT COPY-PASTE README FORMAT (clean + professional + with screenshots section)** 👇

```md
# 🚀 Agent Task Distribution System

A professional MERN Stack (MongoDB, Express.js, React.js, Node.js) application that allows an admin to manage agents, upload CSV/XLS/XLSX files, and automatically distribute tasks among agents using a smart distribution algorithm.

---

## 🎯 Project Overview

This system helps admins to:
- Login securely using JWT authentication
- Create and manage agents
- Upload CSV/XLS/XLSX files
- Validate and process uploaded data
- Automatically distribute records among agents
- Store tasks in MongoDB
- View dashboard analytics

---

## ✨ Features

### 🔐 Authentication
- JWT-based login system
- Password encryption using bcrypt
- Protected routes
- Auto admin creation on first run

---

### 👨‍💼 Agent Management
- Add new agents
- View all agents
- Search agents
- Delete agents
- View assigned task count

---

### 📂 File Upload System
- CSV / XLS / XLSX support
- File validation
- Data parsing (csv-parser / xlsx)
- Error handling

---

### 🔄 Task Distribution
- Round Robin algorithm
- Equal distribution among agents
- Handles remaining records fairly
- Bulk database insert for performance

---

### 📊 Dashboard
- Total agents
- Total tasks
- Upload history
- Distribution analytics
- Charts using Recharts

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Hook Form
- React Hot Toast
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- csv-parser
- xlsx

---

## 📁 Project Structure

```

backend/
frontend/
README.md

````

---

## ⚙️ Setup Instructions

### 1. Clone Project
```bash
git clone https://github.com/your-username/project.git
cd project
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/agent-task-distribution
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Admin Login

```txt
Email: admin@example.com
Password: Admin@123
```

---

## 📡 API Endpoints

### Auth

* POST /api/auth/login

### Agents

* POST /api/agents
* GET /api/agents
* GET /api/agents/:id
* DELETE /api/agents/:id

### Upload

* POST /api/upload

### Tasks

* GET /api/tasks
* GET /api/tasks/agent/:id
* GET /api/tasks/search

---

## 🔄 Distribution Logic

* Uses Round Robin algorithm
* Equal task distribution
* Handles extra records

Example:

```
25 records → 5 agents → 5 each
27 records → 5 agents → 6,6,5,5,5
```

---

## 🧪 Testing

* Login system
* Create agents
* Upload files
* Task distribution
* Search functionality
* Dashboard stats

---

## 📸 Screenshots

Add your screenshots inside `/screenshots` folder.

### Login Page

![Login](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Agents Page

![Agents](screenshots/agents.png)

### Upload Page

![Upload](screenshots/upload.png)

### Tasks Page

![Tasks](screenshots/tasks.png)

---

## 🚀 Features Summary

* JWT Authentication
* Agent Management
* File Upload System
* Automatic Task Distribution
* Dashboard Analytics
* Responsive UI
* MongoDB Database

---

## 👨‍💻 Author

Senior MERN Stack Developer

---

## 📄 License

MIT License

```

---

If you want next level upgrade, I can make:
🔥 “Top 1% Hiring Portfolio README”
🔥 With badges, animations, GitHub stats, and recruiter-ready format

Just tell 👍
```
