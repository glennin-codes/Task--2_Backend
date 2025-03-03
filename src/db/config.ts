import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service';

// Connect function
export const connect = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Connection error:', error);
      process.exit(1);
    }
  };