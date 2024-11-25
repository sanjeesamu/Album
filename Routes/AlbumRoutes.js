const express = require('express');
const {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  searchAlbums
} = require('../Controllers/AlbumController');

const router = express.Router();

// Route to get all albums
router.get('/', getAlbums);

// Route to create a new album
router.post('/', createAlbum);

// Route to update an album by ID
router.put('/:id', updateAlbum);

// Route to delete an album by ID
router.delete('/:id', deleteAlbum);

// Route for searching albums by artist/title
router.get('/search', searchAlbums); 


module.exports = router;
