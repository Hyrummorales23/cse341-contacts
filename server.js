const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
const MongoClient = mongodb.MongoClient;
const connectionString = process.env.MONGODB_URI;

// Define the middleware function FIRST
app.use((req, res, next) => {
  // makes the db connection available to every route
  req.db = app.locals.db;
  next();
});

//  import and use the routes
const routes = require('./routes/index');
app.use('/', routes);

// Async function to connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(connectionString);
    console.log('Connected to MongoDB successfully!');
    // Assign the database connection to app.locals for global access
    app.locals.db = client.db('contactsDB'); // This gets the database from the connection string
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process if DB connection fails
  }
}

// Start the server only after connecting to the database
async function startServer() {
  await connectToMongoDB(); // Wait for the DB to connect
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();