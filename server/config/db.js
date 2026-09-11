import mongoose from 'mongoose';

/**
 * Connect to MongoDB.
 * - If a URI is provided (from MONGO_URI), connect to that real database.
 * - If no URI is provided, spin up an ephemeral in-memory MongoDB so the app
 *   runs with ZERO configuration (great for demos / first run).
 *
 * Returns { conn, memory } where `memory` is true when the in-memory server is used.
 */
export async function connectDB(uri) {
  mongoose.set('strictQuery', true);

  // Setup connection event logging once
  if (!mongoose.connection.listeners('error').length) {
    mongoose.connection.on('connected', () => {
      console.log(`✔ MongoDB connection established.`);
    });
    mongoose.connection.on('error', (err) => {
      console.error(`✖ MongoDB connection error:`, err.message);
    });
    mongoose.connection.on('disconnected', () => {
      console.warn(`! MongoDB disconnected.`);
    });
  }

  if (uri) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 8000,
      });
      console.log(`✔ MongoDB connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
      return { conn, memory: false };
    } catch (err) {
      console.error(`✖ Failed to connect to MongoDB at "${uri}":`, err.message);
      console.warn('  Falling back to in-memory MongoDB for resilience...');
    }
  }

  // Fallback to in-memory MongoDB if no URI provided or connection to real URI failed
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const mem = await MongoMemoryServer.create();
  const memUri = mem.getUri('luxora');
  const conn = await mongoose.connect(memUri, { serverSelectionTimeoutMS: 8000 });
  console.log('✔ In-memory MongoDB started (data is ephemeral).');
  console.log('  Ensure local MongoDB is running or MONGO_URI is valid in server/.env for persistence.');
  return { conn, memory: true };
}
