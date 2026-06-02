# Agent Task Distribution System

A professional-grade MERN (MongoDB, Express.js, React.js, Node.js) application for managing agents and automatically distributing tasks/leads among them.

## 🎯 Project Overview

This application enables administrators to:
- Login securely with JWT authentication
- Create and manage agents (no agent login required)
- Upload CSV/XLS/XLSX files containing lead/task data
- Automatically distribute records equally among agents
- View comprehensive dashboards with analytics
- Search and manage distributed tasks
- Monitor task assignments across the system

## ✨ Features

### Authentication Module
- Secure JWT-based login system
- Password hashing with bcryptjs
- Protected routes and API endpoints
- Session management with token expiry (1 day)
- Default admin account seeding

### Agent Management Module
- Create new agents with validation
- View all agents with pagination
- Search agents by name, email, or mobile
- Delete agents (with task reassignment checks)
- Display agent statistics
- Professional, responsive UI

### File Upload & Distribution Module
- Support for CSV, XLS, XLSX formats
- File validation (size, format, structure)
- Automatic record validation
- Smart distribution algorithm (round-robin)
- Real-time processing feedback
- Bulk database operations for performance

### Dashboard & Analytics
- System statistics cards
- Charts and visualizations using Recharts
- Recent uploads tracking
- Agent performance overview
- Task management and search
- Comprehensive task listings with pagination

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **csv-parser** - CSV parsing
- **xlsx** - Excel file parsing

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form state management
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications
- **Recharts** - Data visualization

### Database
- **MongoDB Atlas** - Cloud database

### Deployment
- **Frontend** - Vercel
- **Backend** - Render

## 📁 Project Structure

```
project2/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── constants.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── agentController.js
│   │   │   ├── taskController.js
│   │   │   └── uploadController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── uploadMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Agent.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── agentRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── uploadRoutes.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── agentService.js
│   │   │   ├── taskService.js
│   │   │   └── uploadService.js
│   │   ├── utils/
│   │   │   ├── validators.js
│   │   │   ├── responseHandler.js
│   │   │   ├── fileParser.js
│   │   │   └── distributionEngine.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js
│   │   ├── components/
│   │   │   └── CommonComponents.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AgentManagementPage.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   └── TasksPage.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── utils/
│   │   ├── assets/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   │   ├── sample-25.csv
│   │   ├── sample-27.csv
│   │   └── sample-100.csv
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### Backend Setup

1. **Clone the repository**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/agent-task-distribution
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

5. **Start the server**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```
VITE_API_URL=http://localhost:5000/api
```

5. **Start development server**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔐 Authentication

### Default Admin Credentials
- **Email**: admin@example.com
- **Password**: Admin@123

These credentials are created automatically on the first server start.

## 📊 Database Schema

### User (Admin)
```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Agent
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  mobile: String (unique, with country code),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  _id: ObjectId,
  firstName: String,
  phone: String,
  notes: String,
  assignedAgent: ObjectId (ref: Agent),
  uploadedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 📡 API Documentation

### Authentication Endpoints

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "_id": "user_id",
      "email": "admin@example.com"
    }
  }
}
```

### Agent Endpoints

#### Create Agent
```
POST /api/agents
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "+919876543210",
  "password": "password123"
}
```

#### Get All Agents
```
GET /api/agents?search=john&page=1&limit=10
Authorization: Bearer TOKEN
```

#### Get Agent by ID
```
GET /api/agents/:id
Authorization: Bearer TOKEN
```

#### Delete Agent
```
DELETE /api/agents/:id
Authorization: Bearer TOKEN
```

#### Get Agent Stats
```
GET /api/agents/stats
Authorization: Bearer TOKEN
```

### Upload Endpoint

#### Upload File
```
POST /api/upload
Authorization: Bearer TOKEN
Content-Type: multipart/form-data

file: <CSV/XLS/XLSX file>

Response:
{
  "success": true,
  "message": "File processed successfully",
  "data": {
    "summary": {
      "totalRows": 25,
      "validRows": 25,
      "distributedRows": 25,
      "agents": 5
    },
    "distribution": {
      "agent_id": {
        "name": "Agent Name",
        "count": 5,
        "percentage": "20.00"
      }
    }
  }
}
```

### Task Endpoints

#### Get All Tasks
```
GET /api/tasks?page=1&limit=10
Authorization: Bearer TOKEN
```

#### Get Task by ID
```
GET /api/tasks/:id
Authorization: Bearer TOKEN
```

#### Get Tasks by Agent
```
GET /api/tasks/agent/:agentId?page=1&limit=10
Authorization: Bearer TOKEN
```

#### Search Tasks
```
GET /api/tasks/search?search=john&page=1&limit=10
Authorization: Bearer TOKEN
```

#### Get Dashboard Stats
```
GET /api/tasks/dashboard/stats
Authorization: Bearer TOKEN
```

## 📝 File Format Requirements

### Supported Formats
- CSV (.csv)
- Excel 2007+ (.xlsx)
- Excel 97-2003 (.xls)

### Required Columns
The uploaded file MUST contain exactly these columns:
1. **FirstName** - Minimum 2 characters
2. **Phone** - Must include country code (e.g., +919876543210)
3. **Notes** - Maximum 500 characters

### Example CSV
```csv
FirstName,Phone,Notes
John,+919876543210,Interested in premium plan
Sarah,+14155552671,Requested callback
Mike,+447911123456,Needs demo
```

### Validation Rules
- File size: Maximum 5MB
- Empty files: Rejected
- Invalid phone format: Record rejected
- Missing columns: File rejected
- Minimum agents required: 5

## 🔄 Distribution Algorithm

The system uses a **Round-Robin distribution** algorithm:

1. Divides total records by number of agents
2. Distributes base records equally
3. Remainder records are distributed sequentially

### Example Distributions
- **25 records, 5 agents**: 5, 5, 5, 5, 5
- **27 records, 5 agents**: 6, 6, 5, 5, 5
- **100 records, 5 agents**: 20, 20, 20, 20, 20

## 🧪 Testing

### Sample Files
Three sample CSV files are included for testing:
- `sample-25.csv` - 25 records
- `sample-27.csv` - 27 records
- `sample-100.csv` - 100 records

### Manual Testing Checklist
- [ ] Login with admin credentials
- [ ] Create multiple agents (at least 5)
- [ ] Upload sample-25.csv and verify distribution
- [ ] Upload sample-27.csv and verify distribution
- [ ] Upload sample-100.csv and verify distribution
- [ ] Search agents by name/email/mobile
- [ ] Search tasks by firstname/phone/notes
- [ ] View dashboard statistics
- [ ] Test pagination on all pages
- [ ] Delete agent with no tasks
- [ ] Try deleting agent with tasks (should fail)
- [ ] Test logout functionality
- [ ] Test token expiry (1 day)
- [ ] Verify responsive design on mobile

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push
```

2. **Connect to Vercel**
   - Go to vercel.com
   - Import your GitHub repository
   - Select `frontend` as root directory
   - Add environment variable: `VITE_API_URL`
   - Deploy

3. **Environment Variables on Vercel**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend Deployment (Render)

1. **Create account on render.com**

2. **Create new Web Service**
   - Connect GitHub repository
   - Select root directory: `backend`
   - Environment: Node
   - Build command: `npm install`
   - Start command: `npm start`

3. **Add environment variables**
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/agent-task-distribution
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

4. **Deploy**

### MongoDB Atlas Setup

1. **Create cluster on MongoDB Atlas**
2. **Create database user**
3. **Get connection string**
4. **Use in MONGO_URI**

## 🔒 Security Features

- **Password Hashing**: Using bcryptjs with 10 salt rounds
- **JWT Authentication**: 1-day expiry
- **Protected Routes**: All dashboard routes require authentication
- **Input Validation**: Frontend and backend validation
- **File Validation**: Type and size restrictions
- **CORS**: Configured for production domains
- **Environment Variables**: Never hardcoded secrets
- **Error Messages**: Secure, non-revealing error messages

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

All pages adapt automatically to screen size.

## 🎨 UI/UX Features

- Modern SaaS dashboard design
- Smooth animations and transitions
- Loading skeletons and spinners
- Toast notifications for feedback
- Empty states with helpful messages
- Error states with retry options
- Confirmation dialogs for destructive actions
- Professional spacing and typography
- Hover effects on interactive elements

## 📈 Performance Optimizations

- Pagination (10 records per page by default)
- Indexed database queries
- Bulk insert operations (insertMany)
- Debounced search inputs
- Lazy loading of data
- Optimized React components
- CSS minification
- JavaScript bundling with Vite

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify MongoDB connection string
- Ensure JWT_SECRET is set
- Check Node.js version

### Frontend won't connect
- Verify VITE_API_URL is correct
- Check if backend is running
- Clear browser cache and cookies
- Check browser console for errors

### Upload fails
- Ensure at least 5 agents exist
- Verify file format (CSV, XLS, XLSX)
- Check file size (max 5MB)
- Verify required columns exist
- Check phone number format

### Login issues
- Verify email format
- Check password length (min 6 chars)
- Ensure admin user was created (check backend logs)
- Try clearing localStorage

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT.io](https://jwt.io/)

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Senior MERN Stack Engineer

## 🤝 Contributing

Feel free to fork and submit pull requests.

---

**Last Updated**: June 2, 2026
**Version**: 1.0.0
