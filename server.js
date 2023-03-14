// Import required modules
const express = require('express');
const apiRoutes = require('./routes/apiRouter');
const htmlRoutes = require('./routes/htmlRouter');

// Create Express app
const app = express();

// Set up port number
const port = process.env.PORT || 3001;

// Middleware for handling data parsing and serving static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
