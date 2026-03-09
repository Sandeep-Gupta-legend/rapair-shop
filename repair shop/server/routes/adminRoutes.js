import express from 'express';
import {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
  getDashboardStats
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Should be disabled after initial setup

// Protected routes
router.get('/profile', protect, getAdminProfile);
router.get('/stats', protect, getDashboardStats);

export default router;
