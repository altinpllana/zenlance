// index.js

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = 4000; // Change the port here

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware
app.use('/', routes);

// Handle GET request to /register
app.get('/register', (req, res) => {
  res.status(405).json({ message: 'Method Not Allowed' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
