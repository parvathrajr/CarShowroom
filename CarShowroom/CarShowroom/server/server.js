import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Car from './models/Car.js';
import { cars as seedCars } from './seed/carsData.js';
import carRoutes from './routes/carRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'luxora-api' }));

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);

    // Auto-seed if the collection is empty (so the app always has data on first run).
    const count = await Car.countDocuments();
    if (count === 0) {
      await Car.insertMany(seedCars);
      console.log(`✔ Auto-seeded ${seedCars.length} cars.`);
    }

    app.listen(PORT, () => console.log(`🚗 Luxora API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('✖ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
