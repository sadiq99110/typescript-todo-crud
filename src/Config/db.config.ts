// Importing modules
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env
dotenv.config();

// Details from the env
const dbName = 'Post';
const connectionString = process.env.MONGODB_CONNECTION_STRING;

// Check if the MongoDB connection string is provided
if (!connectionString) {
  throw new Error('MongoDB connection string is not provided in the environment variables.');
}

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

// DB connection
export const db = mongoose
  .connect(connectionString, options)
  .then((res) => {
    if (res) {
      console.log(`Database connection successful to ${dbName}`);
    }
  })
  .catch((err) => {
    console.log(err);
  });
