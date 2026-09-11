import { Router } from 'express';
import { getCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/carController.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

router.route('/').get(getCars).post(requireAdmin, createCar);
router.route('/:id').get(getCarById).patch(requireAdmin, updateCar).delete(requireAdmin, deleteCar);

export default router;
