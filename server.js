const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;  // Use the environment port or 5000 as a fallback

app.use(cors());  // Enable CORS for all origins
app.use(bodyParser.json());  // Parse JSON bodies in requests

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
