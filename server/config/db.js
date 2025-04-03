const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGO_URI;
    
    // If we're in a test or development environment and the URI is localhost, use in-memory MongoDB
    if ((process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') && 
        mongoURI.includes('localhost')) {
      const mongod = await MongoMemoryServer.create();
      mongoURI = mongod.getUri();
      console.log('Using in-memory MongoDB server');
    }
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
