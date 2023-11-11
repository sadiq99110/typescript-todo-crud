"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Importing modules
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// Load environment variables from .env
dotenv_1.default.config();
// Details from the env
const dbName = 'Post';
const connectionString = process.env.MONGODB_CONNECTION_STRING;
// Check if the MongoDB connection string is provided
if (!connectionString) {
    throw new Error('MongoDB connection string is not provided in the environment variables.');
}
const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
};
// DB connection
exports.db = mongoose_1.default
    .connect(connectionString, options)
    .then((res) => {
    if (res) {
        console.log(`Database connection successful to ${dbName}`);
    }
})
    .catch((err) => {
    console.log(err);
});
