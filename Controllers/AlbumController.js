const Album = require('../models/Album');

// Get all albums with optional sorting and filtering
const getAlbums = async (req, res) => {
  const { sort, minYear, maxYear, fields } = req.query;

  // Initialize a filter object for the year
  let filter = {};
  if (minYear || maxYear) {
    filter.year = {};
    if (minYear) filter.year.$gte = parseInt(minYear); // Year greater than or equal to minYear
    if (maxYear) filter.year.$lte = parseInt(maxYear); // Year less than or equal to maxYear
  }

  // Sort options (allowable fields)
  const allowedSortFields = ['artist', 'year', 'title', 'genre'];
  let sortOptions = {};
  if (allowedSortFields.includes(sort)) {
    sortOptions[sort] = 1;
  }

  // Select only the fields requested by the client
  let selectedFields = '';
  if (fields) {
    selectedFields = fields.split(',').join(' '); // Convert 'artist,title' to 'artist title'
  }

  // Apply filtering, sorting, and field selection
  const albums = await Album.find(filter).sort(sortOptions).select(selectedFields);
  res.status(200).json({ albums });
};

// Create a new album
const createAlbum = async (req, res) => {
  const album = new Album(req.body);
  await album.save(); // This line can throw a validation error if the data is invalid
  res.status(201).json({ album });
};

// Update an album
const updateAlbum = async (req, res) => {
  const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!album) return res.status(404).json({ message: 'Album not found' });
  res.status(200).json({ album });
};

// Delete an album
const deleteAlbum = async (req, res) => {
  const album = await Album.findByIdAndDelete(req.params.id);
  if (!album) return res.status(404).json({ message: 'Album not found' });
  res.status(200).json({ message: 'Album deleted successfully' });
};

// Search Albums with additional filters
const searchAlbums = async (req, res) => {
  const { fields, search, startYear, endYear } = req.query;

  // Create a query object
  const query = {};

  // Search for artist names or album titles using regex if 'search' query param is provided
  if (search) {
    const regex = new RegExp(search, 'i'); // 'i' makes it case-insensitive
    query.$or = [
      { artist: regex },  // Match pattern in artist field
      { title: regex }    // Match pattern in title field
    ];
  }

  // Filter albums by release year range
  if (startYear || endYear) {
    query.year = {};

    // If startYear is provided, set it as the minimum year
    if (startYear) {
      query.year.$gte = parseInt(startYear, 10);  // Greater than or equal to startYear
    }

    // If endYear is provided, set it as the maximum year
    if (endYear) {
      query.year.$lte = parseInt(endYear, 10);  // Less than or equal to endYear
    }
  }

  // Perform the database query with field selection, regex search, and year filtering
  let albumsQuery = Album.find(query);

  // Handle fields selection
  if (fields) {
    const fieldsList = fields.split(',').join(' '); // Convert "artist,title" to "artist title"
    albumsQuery = albumsQuery.select(fieldsList);
  }

  // Execute the query
  const albums = await albumsQuery;

  // Return the albums
  res.status(200).json({ albums });
};

module.exports = {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  searchAlbums,
};
