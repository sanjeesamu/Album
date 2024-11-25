"use strict";

var express = require('express');

var mongoose = require('mongoose');

var albumRoutes = require('./Routes/AlbumRoutes');

var path = require('path');

require('dotenv').config();

require('express-async-errors'); // Automatically handles async errors


var _process$env = process.env,
    PORT = _process$env.PORT,
    MONGO_URI = _process$env.MONGO_URI;
var app = express(); // Middleware

app.use(express.json()); // Parse JSON requests
// Serve static files from the "public" folder

app.use(express["static"](path.join(__dirname, 'public'))); // Album routes

app.use('/albums', albumRoutes);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message
  });
}); // MongoDB connection

var dbURI = MONGO_URI;
mongoose.connect(dbURI, {//useNewUrlParser: true, 
  //useUnifiedTopology: true 
}).then(function () {
  app.listen(3000, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
  });
})["catch"](function (err) {
  return console.log('MongoDB connection error: ', err);
});