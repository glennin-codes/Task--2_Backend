import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User interface extending mongoose.Document
interface IUser extends Document {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  // You can add other fields like createdAt, updatedAt if needed
}

// Define the User schema
const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
export const User = mongoose.model<IUser>('User', userSchema);