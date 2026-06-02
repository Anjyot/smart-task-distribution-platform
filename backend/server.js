import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';

// Routes
import authRoutes from './src/routes/authRoutes.js';
import agentRoutes from './src/routes/agentRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import uploadsRoutes from './src/routes/uploadsRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

// Load environment variables FIRST
const envConfig = dotenv.config();
if (envConfig.error) {
  console.warn('⚠️  .env file not found. Using system environment variables.');
} else {
  console.log('✓ .env file loaded successfully');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
