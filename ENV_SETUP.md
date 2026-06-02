# Agent Task Distribution System - Root Environment Configuration

## Backend Environment (.env)
Located in: `backend/.env`

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/agent-task-distribution
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

## Frontend Environment (.env)
Located in: `frontend/.env`

```
VITE_API_URL=http://localhost:5000/api
```

## Production Environment Variables

### Backend (Render)
```
PORT=5000
MONGO_URI=mongodb+srv://[USERNAME]:[PASSWORD]@[CLUSTER].mongodb.net/[DATABASE]
JWT_SECRET=[GENERATE_SECURE_KEY]
NODE_ENV=production
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-on-render.onrender.com/api
```

## Generating Secure JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## MongoDB Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```
