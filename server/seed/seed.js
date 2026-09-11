import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Car from '../models/Car.js';
import { cars } from './carsData.js';

dotenv.config();

async function run() {
  try {
    if (!process.env.MONGO_URI) {
      console.error(
        'This script seeds a real database. Set MONGO_URI in server/.env first.\n' +
          '(If you just run "npm run dev" with no MONGO_URI, an in-memory DB is auto-seeded for you.)'
      );
      process.exit(1);
    }
    await connectDB(process.env.MONGO_URI);
    await Car.deleteMany();
    const created = await Car.insertMany(cars);
    console.log(`✔ Seeded ${created.length} cars.`);
  } catch (err) {
    console.error('Seed failed:', err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

run();
