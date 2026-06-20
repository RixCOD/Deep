const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/deepdish';

    console.log(`[MongoDB] Connecting to: ${mongoUri}`);

    await mongoose.connect(mongoUri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('[MongoDB] ✓ Connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('[MongoDB] ✗ Connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
