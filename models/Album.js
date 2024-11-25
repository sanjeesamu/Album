const mongoose = require('mongoose');

const currentYear = new Date().getFullYear(); // Get the current year

// Predefined list of acceptable genres
const genres = ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'Blues', 'Electronic', 'Country', 'Reggae', 'Jazz Rock'];

const albumSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    minlength: [3, 'Artist name must be at least 3 characters long'],
    maxlength: [50, 'Artist name cannot exceed 50 characters']
  },
  title: {
    type: String,
    required: [true, 'Album title is required'],
    minlength: [3, 'Album title must be at least 3 characters long'],
    maxlength: [50, 'Album title cannot exceed 50 characters']
  },
  year: {
    type: Number,
    required: [true, 'Release year is required'],
    min: [1900, 'Release year cannot be earlier than 1900'],
    max: [currentYear, `Release year cannot be later than ${currentYear}`]
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: {
      values: genres,
      message: 'Genre must be one of the following: ' + genres.join(', ')
    }
  },
  tracks: {
    type: Number,
    required: [true, 'Track count is required'],
    min: [1, 'Track count must be greater than 0'],
    max: [100, 'Track count cannot exceed 100']
  },
  updatedAt: {
    type: Date,
    default: Date.now 
  }
});

// Pre-save hook to set the updatedAt field
albumSchema.pre('save', function(next) {
    console.log('Setting updatedAt field'); 
    this.updatedAt = Date.now();  // Set updatedAt to current timestamp
    next();
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
