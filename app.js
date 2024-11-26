const express = require('express');
const mongoose = require('mongoose');
const albumRoutes = require('./Routes/AlbumRoutes');
const path = require('path');
require('dotenv').config();
require('express-async-errors'); // Automatically handles async errors

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Serve static files (for frontend, if any)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/albums', albumRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    const port = process.env.PORT || 3000; // Use PORT from Vercel or fallback to 3000
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

module.exports = app;
