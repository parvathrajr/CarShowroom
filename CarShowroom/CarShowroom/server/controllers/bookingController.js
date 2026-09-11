import mongoose from 'mongoose';
import Booking from '../models/Booking.js';

// POST /api/bookings  (test-drive / contact request)
export async function createBooking(req, res, next) {
  try {
    const { name, email, model, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }
    const booking = await Booking.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      model: model ? String(model).trim() : '',
      message: message ? String(message).trim() : '',
    });
    res.status(201).json({
      message: 'Thank you! A concierge will reach out shortly.',
      booking,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/bookings  (admin view)
export async function getBookings(req, res, next) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/bookings/:id  (update status)
export async function updateBooking(req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    const { status } = req.body;
    const allowed = ['pending', 'contacted', 'completed'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be pending, contacted, or completed.' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/bookings/:id
export async function deleteBooking(req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    next(err);
  }
}
