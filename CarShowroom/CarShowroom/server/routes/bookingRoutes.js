import { Router } from 'express';
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

router.route('/').post(createBooking).get(requireAdmin, getBookings);
router.route('/:id').patch(requireAdmin, updateBooking).delete(requireAdmin, deleteBooking);

export default router;
