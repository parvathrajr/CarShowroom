import mongoose from 'mongoose';
import Car from '../models/Car.js';

// GET /api/cars?featured=true&brand=Ferrari
export async function getCars(req, res, next) {
  try {
    const filter = {};
    if (req.query.featured === 'true') filter.featured = true;
    if (req.query.brand && req.query.brand !== 'All') filter.brand = req.query.brand;

    const cars = await Car.find(filter).sort({ price: 1 });
    res.json(cars);
  } catch (err) {
    next(err);
  }
}

// GET /api/cars/:id
export async function getCarById(req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Car not found' });
    }
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    next(err);
  }
}

// POST /api/cars
export async function createCar(req, res, next) {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/cars/:id
export async function updateCar(req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Car not found' });
    }
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/cars/:id
export async function deleteCar(req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Car not found' });
    }
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted' });
  } catch (err) {
    next(err);
  }
}
