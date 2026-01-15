require('dotenv').config({ path: '.env.local' });
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Please provide MONGODB_URI in .env.local");
  process.exit(1);
}

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('homechores');

    // Clear existing
    await db.collection('houses').deleteMany({});
    await db.collection('users').deleteMany({});
    await db.collection('chores').deleteMany({});

    // Create House
    const houseId = new ObjectId();
    await db.collection('houses').insertOne({
      _id: houseId,
      name: "The Cool Household",
      createdAt: new Date()
    });

    // Create Admin
    const adminId = new ObjectId();
    await db.collection('users').insertOne({
      _id: adminId,
      houseId,
      name: "Parent Admin",
      role: 'admin',
      avatarUrl: '👨‍💼',
      createdAt: new Date()
    });

    // Create Players
    const sarahId = new ObjectId();
    await db.collection('users').insertOne({
      _id: sarahId,
      houseId,
      name: "Sarah",
      role: 'player',
      avatarUrl: '👩‍🦰',
      createdAt: new Date()
    });

    const jamesId = new ObjectId();
    await db.collection('users').insertOne({
      _id: jamesId,
      houseId,
      name: "James",
      role: 'player',
      avatarUrl: '👦',
      createdAt: new Date()
    });

    // Create Chores
    await db.collection('chores').insertMany([
      { houseId, name: 'Wash the dishes', points: 50, repeatType: 'daily', active: true },
      { houseId, name: 'Clean your room', points: 100, repeatType: 'weekly', active: true },
      { houseId, name: 'Feed the dog', points: 30, repeatType: 'daily', active: true },
      { houseId, name: 'Take out trash', points: 40, repeatType: 'daily', active: true },
    ]);

    console.log('Seeding successful!');
    console.log(`House ID: ${houseId}`);
    console.log(`Sarah ID: ${sarahId}`);
    console.log(`James ID: ${jamesId}`);
  } finally {
    await client.close();
  }
}

seed();
