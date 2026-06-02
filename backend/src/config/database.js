import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Debug: Check if MONGO_URI is loaded
    console.log('=== MongoDB Connection Debug ===');
    console.log('MONGO_URI:', process.env.MONGO_URI ? '✓ Loaded' : '✗ UNDEFINED');
    console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
    console.log('================================');

    if (!process.env.MONGO_URI) {
      throw new Error(
        'MONGO_URI environment variable is not set. Please configure .env file with a valid MongoDB connection string.'
      );
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
