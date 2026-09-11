import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Car from './models/Car.js';
import Booking from './models/Booking.js';
import User from './models/User.js';

dotenv.config();

async function runTests() {
  console.log('\n--- 1. Testing MongoDB Connection ---');
  const dbResult = await connectDB(process.env.MONGO_URI);
  console.log(`Connected to MongoDB. Memory fallback: ${dbResult.memory}`);
  if (dbResult.memory) {
    throw new Error('Expected real MongoDB connection, but connected to in-memory fallback!');
  }

  console.log('\n--- 2. Testing Car Model (All Car Models) ---');
  const carCount = await Car.countDocuments();
  console.log(`Total cars found in database: ${carCount}`);
  if (carCount < 17) {
    throw new Error(`Expected at least 17 cars, found ${carCount}`);
  }

  const sampleCar = await Car.findOne({ brand: 'Ferrari' });
  console.log(`Sample Car: ${sampleCar.name} (${sampleCar.brand}) - Price: ${sampleCar.priceLabel}, HP: ${sampleCar.horsepower}`);
  if (!sampleCar.priceLabel.startsWith('$')) {
    throw new Error('Virtual priceLabel not working properly!');
  }

  console.log('\n--- 3. Testing Booking Model (CRUD) ---');
  // CREATE
  const newBooking = await Booking.create({
    name: 'Verification Test User',
    email: 'test.user@luxoramotors.test',
    model: sampleCar.name,
    message: 'Testing booking creation through Booking model',
    status: 'pending',
  });
  console.log(`✔ Created booking with ID: ${newBooking._id}`);

  // READ
  const foundBooking = await Booking.findById(newBooking._id);
  if (!foundBooking || foundBooking.name !== 'Verification Test User') {
    throw new Error('Failed to find created booking!');
  }
  console.log(`✔ Found booking for: ${foundBooking.name}, Status: ${foundBooking.status}`);

  // UPDATE
  foundBooking.status = 'contacted';
  await foundBooking.save();
  const updatedBooking = await Booking.findById(newBooking._id);
  if (updatedBooking.status !== 'contacted') {
    throw new Error('Failed to update booking status!');
  }
  console.log(`✔ Updated booking status to: ${updatedBooking.status}`);

  // DELETE
  await Booking.findByIdAndDelete(newBooking._id);
  const deletedCheck = await Booking.findById(newBooking._id);
  if (deletedCheck) {
    throw new Error('Failed to delete booking!');
  }
  console.log('✔ Successfully deleted test booking.');

  console.log('\n--- 4. Testing User Model (Auth & Password Hashing) ---');
  // Clean up existing test user if any
  await User.deleteOne({ email: 'john.luxora@example.com' });

  // CREATE USER
  const hashedPassword = User.hashPassword('SuperSecret123!');
  const testUser = await User.create({
    name: 'John Luxora',
    email: 'john.luxora@example.com',
    passwordHash: hashedPassword,
    role: 'customer',
  });
  console.log(`✔ Created user: ${testUser.name} (${testUser.email}), Role: ${testUser.role}`);

  // VERIFY PASSWORD
  const valid = testUser.verifyPassword('SuperSecret123!');
  const invalid = testUser.verifyPassword('WrongPassword');
  console.log(`Password verification: Valid='${valid}', InvalidCheck='${!invalid}'`);
  if (!valid || invalid) {
    throw new Error('User password verification logic failed!');
  }

  // TEST DUPLICATE EMAIL REJECTION
  let duplicateRejected = false;
  try {
    await User.create({
      name: 'Duplicate John',
      email: 'john.luxora@example.com',
      passwordHash: hashedPassword,
    });
  } catch (err) {
    duplicateRejected = true;
    console.log(`✔ Duplicate user correctly rejected: ${err.message}`);
  }
  if (!duplicateRejected) {
    throw new Error('Expected duplicate email to be rejected, but it succeeded!');
  }

  // CLEAN UP TEST USER
  await User.findByIdAndDelete(testUser._id);
  console.log('✔ Successfully cleaned up test user.');

  console.log('\n=============================================');
  console.log('🎉 ALL TESTS PASSED: MongoDB and all models (Car, Booking, User) are 100% operational!');
  console.log('=============================================\n');
}

runTests()
  .catch((err) => {
    console.error('\n✖ Test failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
    process.exit();
  });
