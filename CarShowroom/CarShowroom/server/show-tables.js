import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luxora';

async function displayDatabase() {
  console.log(`\n======================================================`);
  console.log(`🔍 CONNECTING TO MONGODB: ${uri}`);
  console.log(`======================================================`);

  await mongoose.connect(uri);

  const adminDb = mongoose.connection.db.admin();
  const { databases } = await adminDb.listDatabases();
  
  console.log(`\n📁 ALL MONGODB DATABASES:`);
  console.table(
    databases.map((db) => ({
      'Database Name': db.name,
      'Size on Disk': `${(db.sizeOnDisk / 1024).toFixed(2)} KB`,
      'Empty': db.empty ? 'Yes' : 'No',
    }))
  );

  console.log(`\n🗄️ CURRENT DATABASE: "${mongoose.connection.name}"`);

  const collections = await mongoose.connection.db.listCollections().toArray();
  
  console.log(`\n📊 COLLECTIONS ("TABLES") IN "${mongoose.connection.name}":`);
  
  const summary = [];
  for (const col of collections) {
    const count = await mongoose.connection.db.collection(col.name).countDocuments();
    summary.push({
      'Collection / Table Name': col.name,
      'Document Count': count,
      'Type': col.type || 'collection',
    });
  }
  console.table(summary);

  // Show detailed records from each collection
  for (const col of collections) {
    console.log(`\n------------------------------------------------------`);
    console.log(`📋 TABLE / COLLECTION: "${col.name}"`);
    console.log(`------------------------------------------------------`);
    
    const docs = await mongoose.connection.db.collection(col.name).find({}).limit(10).toArray();
    
    if (docs.length === 0) {
      console.log(`(Empty collection — no records yet)`);
      continue;
    }

    if (col.name === 'cars') {
      console.table(
        docs.map((d) => ({
          'ID': d._id.toString(),
          'Brand': d.brand,
          'Name': d.name,
          'Price': `$${Number(d.price).toLocaleString('en-US')}`,
          'HP': d.horsepower,
          'Engine': d.engine,
          'Seats': d.seats,
          'Featured': d.featured ? '⭐ Yes' : 'No',
        }))
      );
      if (docs.length < summary.find((s) => s['Collection / Table Name'] === col.name)['Document Count']) {
        console.log(`... and ${summary.find((s) => s['Collection / Table Name'] === col.name)['Document Count'] - docs.length} more cars in database.`);
      }
    } else if (col.name === 'bookings') {
      console.table(
        docs.map((d) => ({
          'ID': d._id.toString(),
          'Name': d.name,
          'Email': d.email,
          'Model': d.model || '—',
          'Status': d.status,
          'Created At': d.createdAt ? new Date(d.createdAt).toLocaleString() : '—',
        }))
      );
    } else if (col.name === 'users') {
      console.table(
        docs.map((d) => ({
          'ID': d._id.toString(),
          'Name': d.name,
          'Email': d.email,
          'Role': d.role,
          'Created At': d.createdAt ? new Date(d.createdAt).toLocaleString() : '—',
        }))
      );
    } else {
      console.table(docs);
    }
  }

  console.log(`\n======================================================`);
  console.log(`✔ Query finished successfully.`);
  console.log(`======================================================\n`);
}

displayDatabase()
  .catch((err) => {
    console.error('Error querying MongoDB:', err.message);
  })
  .finally(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
