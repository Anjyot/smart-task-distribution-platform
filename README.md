# 🚀 Agent Task Distribution System

A **production-ready MERN Stack (MongoDB, Express.js, React.js, Node.js)** application designed to manage agents, process uploaded CSV/XLS/XLSX files, and automatically distribute tasks using a scalable round-robin algorithm.

This system simulates a real-world **CRM / Task Management SaaS platform** with authentication, role-based control, file processing, and analytics dashboard.

---

## 🎯 Project Objective

The main goal of this project is to build a system where:

- Admin can securely log in
- Admin can create and manage agents
- Admin can upload lead/task files (CSV, XLS, XLSX)
- System validates and processes uploaded data
- Tasks are automatically distributed among agents
- Admin can monitor everything through a dashboard

---

## ✨ Key Features

### 🔐 Authentication System
- Secure JWT-based authentication
- Password encryption using bcryptjs
- Protected routes for all dashboard features
- Auto admin creation on first server start
- Token expiry handling (1 day)

---

### 👨‍💼 Agent Management System
- Create new agents with validation
- View all agents in tabular format
- Search agents (name, email, mobile)
- Delete agents with safety checks
- Display assigned task count per agent
- Pagination support for large datasets

---

### 📂 File Upload & Processing
- Supports:
  - CSV
  - XLS
  - XLSX
- File validation (type, size, structure)
- Automatic parsing using:
  - `csv-parser`
  - `xlsx`
- Invalid record detection and reporting
- Bulk processing for performance optimization

---

### 🔄 Task Distribution Engine
- Round-robin distribution algorithm
- Equal workload distribution across agents
- Handles remaining records intelligently
- Bulk insertion using `insertMany`
- Optimized for large datasets (1000+ records)

---

### 📊 Dashboard & Analytics
- Total agents count
- Total tasks count
- Upload history tracking
- Task distribution analytics
- Agent performance overview
- Charts using Recharts
- Real-time system insights

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- Multer (file upload)
- csv-parser
- xlsx

### Database
- MongoDB Atlas / Local MongoDB

---

## 📁 Project Architecture

```
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validations/
│
├── uploads/
├── server.js
└── package.json

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── routes/
│   ├── utils/
│   └── assets/
│
└── package.json
```

---

## ⚙️ Installation & Setup Guide

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/agent-task-distribution-system.git
cd agent-task-distribution-system
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
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

Backend runs at:
```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🔐 Default Admin Credentials

```
Email: admin@example.com
Password: Admin@123
```

---

## 📡 API Endpoints

### Authentication
```
POST /api/auth/login
```

### Agents
```
POST   /api/agents
GET    /api/agents
GET    /api/agents/:id
DELETE /api/agents/:id
```

### Upload
```
POST /api/upload
```

### Tasks
```
GET /api/tasks
GET /api/tasks/agent/:id
GET /api/tasks/search
```

---

## 🔄 Task Distribution Logic

The system uses a **Round Robin Algorithm**:

```
Example:

25 records → 5 agents → 5 each  
27 records → 5 agents → 6,6,5,5,5  
100 records → 5 agents → 20 each  
```

This ensures:
- Equal workload distribution
- Fair assignment
- Scalable processing

---

## 🧪 Testing Checklist

- [x] Admin login works
- [x] Agent creation works
- [x] File upload works
- [x] Task distribution works
- [x] Search functionality works
- [x] Dashboard analytics works
- [x] Responsive UI works

---

## 📸 Screenshots

> Add all screenshots inside `/screenshots` folder

```
screenshots/
├── login.png
├── dashboard.png
├── agents.png
├── upload.png
├── tasks.png
```

---

### 🔐 Login Page
<img width="1918" height="911" alt="image" src="https://github.com/user-attachments/assets/7557e853-e555-47d8-b93b-0325d072de6a" />

### 📊 Dashboard
<img width="1918" height="911" alt="image" src="https://github.com/user-attachments/assets/58c9905f-7d2c-4d0c-ac21-d41f5cce34b7" />
<img width="1918" height="816" alt="image" src="https://github.com/user-attachments/assets/2c03a96f-1a8c-4ad7-a254-0babb9f78c7e" />

### 👨‍💼 Agent Management
<img width="1918" height="906" alt="image" src="https://github.com/user-attachments/assets/81dabbb4-a507-4e64-8a84-11359dbac6f2" />

### 📂 File Upload System
<img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/48be001c-0582-4abc-ac92-d52498264153" />
<img width="1918" height="911" alt="image" src="https://github.com/user-attachments/assets/5cfc163a-5e77-436e-abe2-3270d6dde314" />

### 📋 Task Distribution
<img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/47df98a8-31c2-40b4-aa96-ab563718c8f1" />

---

## 🚀 Performance Highlights

- Optimized MongoDB queries
- Bulk insert operations
- Pagination for large datasets
- Debounced search
- Efficient file parsing
- Lightweight React components

---

## 🔐 Security Features

- JWT authentication
- Password hashing (bcrypt)
- Input validation
- Protected API routes
- Secure environment variables
- File type validation

---

## 📱 Responsive Design

Fully responsive across:

- Desktop 💻
- Tablet 📱
- Mobile 📱

---

## 👨‍💻 Author

**Anjyot Dhamapurkar**

---

## 📄 License

This project is licensed under MIT License.

---

## ⭐ Final Note

If you like this project, consider giving it a ⭐ on GitHub.

This project demonstrates:
✔ Real-world architecture  
✔ Scalable backend design  
✔ Production-level frontend  
✔ File processing system  
✔ Task automation logic  
