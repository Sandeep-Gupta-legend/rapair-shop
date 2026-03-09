import express from 'express';
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getReviews);
router.get('/:id', getReview);
router.post('/', createReview); // Public - allow users to submit reviews

// Protected routes (admin only)
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
