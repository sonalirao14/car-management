import express from 'express';
import { createCar, getCars, getCar, updateCar, deleteCar, searchCars } from '../controllers/car.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, createCar);
router.get('/', authenticate, getCars);
router.get('/:id', authenticate, getCar);
router.patch('/:id', authenticate, updateCar);
router.delete('/:id', authenticate, deleteCar);
router.get('/search', authenticate, searchCars);

export default router;