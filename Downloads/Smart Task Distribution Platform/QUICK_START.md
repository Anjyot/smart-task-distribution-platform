# Quick Start Guide

## 🚀 Quick Setup (Local Development)

### Step 1: Backend Setup (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT_SECRET
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 2: Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend API URL
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Step 3: Login
- Open `http://localhost:5173`
- Use credentials:
  - Email: `admin@example.com`
  - Password: `Admin@123`

## ✅ Workflow

1. **Create Agents**: Go to /agents page and add at least 5 agents
2. **Upload Files**: Use /upload page to upload CSV files
3. **View Results**: Check /dashboard for statistics
4. **Manage Tasks**: View all tasks in /tasks page

## 📁 Sample Files

Located in: `frontend/public/`
- sample-25.csv
- sample-27.csv
- sample-100.csv

## 🔧 Development Commands

### Backend
```bash
cd backend
npm run dev      # Start development server with auto-reload
npm start        # Start production server
npm run seed     # Run admin seeding manually
```

### Frontend
```bash
cd frontend
npm run dev      # Start Vite dev server
npm run build    # Create production build
npm run preview  # Preview production build
```

## 📊 API Health Check

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "API is running"
}
```

## 🔐 Admin Seeding

The default admin is created automatically on first server start:
- Email: `admin@example.com`
- Password: `Admin@123`

To manually seed:
```bash
cd backend
npm run seed
```

## 🗄️ MongoDB Setup

1. Create account at mongodb.com
2. Create a cluster
3. Create a database user
4. Get connection string
5. Add to `.env` file as `MONGO_URI`

Connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

## 📦 Dependencies Installation Issues

If you face installation issues:

### Backend
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Production Deployment

### Frontend to Vercel
1. Push to GitHub
2. Go to vercel.com
3. Import repository
4. Set root directory to `frontend`
5. Add env var: `VITE_API_URL=<backend-url>`
6. Deploy

### Backend to Render
1. Push to GitHub
2. Go to render.com
3. Create new Web Service
4. Connect GitHub
5. Set root directory to `backend`
6. Add environment variables
7. Deploy

## 🧪 Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend loads successfully
- [ ] Login works with admin credentials
- [ ] Can create new agents
- [ ] Can upload CSV file (use sample files)
- [ ] Distribution works correctly
- [ ] Dashboard loads statistics
- [ ] Search functionality works
- [ ] Pagination works
- [ ] Delete operations work
- [ ] Logout clears session
- [ ] Responsive design works on mobile

## 📞 Support

For issues:
1. Check server console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is accessible
4. Check if ports 5000 and 5173 are available
5. Clear browser cache and try again

## 📝 Notes

- Keep uploads/ folder clean after testing
- Default JWT expiry is 1 day
- All passwords are hashed with bcryptjs
- Phone numbers must include country code
- Files must contain FirstName, Phone, Notes columns
