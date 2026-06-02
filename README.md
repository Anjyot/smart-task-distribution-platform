# 🚀 Agent Task Distribution System

A professional MERN Stack (MongoDB, Express.js, React.js, Node.js) application that allows an admin to manage agents, upload CSV/XLS/XLSX files, and automatically distribute tasks using a smart round-robin algorithm.

---

## 🎯 Project Overview

This system enables an admin to:
- Secure login using JWT authentication
- Create and manage agents
- Upload CSV / XLS / XLSX files
- Validate uploaded data
- Automatically distribute records among agents
- Store tasks in MongoDB
- View dashboard analytics

---

## ✨ Features

### 🔐 Authentication
- JWT-based login system
- Password hashing using bcrypt
- Protected routes
- Auto admin creation on first run

---

### 👨‍💼 Agent Management
- Add agents
- View agents list
- Search agents
- Delete agents
- View assigned task count

---

### 📂 File Upload System
- CSV / XLS / XLSX support
- File validation (format, size, structure)
- Data parsing using csv-parser & xlsx
- Error handling

---

### 🔄 Task Distribution System
- Round Robin algorithm
- Equal task allocation
- Handles extra records fairly
- Bulk insert optimization using insertMany

---

### 📊 Dashboard
- Total agents count
- Total tasks count
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
- MongoDB + Mongoose
- JWT Authentication
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
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/agent-task-distribution.git
cd agent-task-distribution
```

---

### 2️⃣ Backend Setup
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

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Default Admin Login

```
Email: admin@example.com
Password: Admin@123
```

---

## 📡 API Endpoints

### Auth
- POST `/api/auth/login`

### Agents
- POST `/api/agents`
- GET `/api/agents`
- GET `/api/agents/:id`
- DELETE `/api/agents/:id`

### Upload
- POST `/api/upload`

### Tasks
- GET `/api/tasks`
- GET `/api/tasks/agent/:id`
- GET `/api/tasks/search`

---

## 🔄 Distribution Logic

Round Robin Algorithm:

```
25 records → 5 agents → 5 each
27 records → 5 agents → 6,6,5,5,5
100 records → 5 agents → 20 each
```

---

## 🧪 Testing Checklist

- Login system working
- Agent creation working
- File upload working
- Task distribution working
- Search functionality working
- Dashboard stats working

---

## 📸 Screenshots

Create folder:

```
screenshots/
```

Add images:

- login.png
- dashboard.png
- agents.png
- upload.png
- tasks.png

---

### 🔐 Login Page
![Login](screenshots/login.png)

### 📊 Dashboard
![Dashboard](screenshots/dashboard.png)

### 👨‍💼 Agents Page
![Agents](screenshots/agents.png)

### 📂 Upload Page
![Upload](screenshots/upload.png)

### 📋 Tasks Page
![Tasks](screenshots/tasks.png)

---

## 🚀 Features Summary

- JWT Authentication
- Agent Management
- File Upload System
- Automatic Task Distribution
- Dashboard Analytics
- Responsive UI
- MongoDB Integration

---

## 👨‍💻 Author

Senior MERN Stack Developer

---

## 📄 License

MIT License

---

## ⭐ Note

If you like this project, give it a star ⭐
```
