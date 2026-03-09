import express from 'express';
import {
  submitContact,
  getMessages,
  getMessage,
  deleteMessage
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Protected routes
router.get('/messages', protect, getMessages);
router.get('/messages/:id', protect, getMessage);
router.delete('/messages/:id', protect, deleteMessage);

export default router;
