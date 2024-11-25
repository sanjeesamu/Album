const express = require('express');
const mongoose = require('mongoose');
const albumRoutes = require('./Routes/AlbumRoutes');
const path = require('path');
require('dotenv').config();
require('express-async-errors'); // Automatically handles async errors

const { PORT, MONGO_URI } = process.env
const app = express();

// Middleware
app.use(express.json());  // Parse JSON requests

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Album routes
app.use('/albums', albumRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});
// MongoDB connection
const dbURI = MONGO_URI;
mongoose.connect(dbURI, { 
  //useNewUrlParser: true, 
  //useUnifiedTopology: true 
})
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log('MongoDB connection error: ', err));
