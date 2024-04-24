// Load environment variables from .env file at the very beginning
require('dotenv').config();

// Load required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Assuming you will use mongoose for MongoDB operations

// Create the Express application
const app = express();
const port = process.env.PORT || 5000;  // Use the environment port or 5000 as a fallback

// Middleware setup
app.use(cors());  // Enable CORS for all origins
app.use(bodyParser.json());  // Parse JSON bodies in requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log("Connected successfully to MongoDB");
});

// Define a route for authentication
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Here, you would typically check against a database
  if (username === 'admin' && password === 'password') {  // Example validation
    res.json({ message: "Login successful", status: 'success' });
  } else {
    res.status(401).json({ message: "Invalid credentials", status: 'error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
