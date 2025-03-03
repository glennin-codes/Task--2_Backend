import express from 'express';
import { register, login, deleteUser } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.delete('/delete', auth, deleteUser);

export default router; 