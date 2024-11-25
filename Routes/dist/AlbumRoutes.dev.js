"use strict";

var express = require('express');

var _require = require('../Controllers/AlbumController'),
    getAlbums = _require.getAlbums,
    createAlbum = _require.createAlbum,
    updateAlbum = _require.updateAlbum,
    deleteAlbum = _require.deleteAlbum,
    searchAlbums = _require.searchAlbums;

var router = express.Router(); // Route to get all albums

router.get('/', getAlbums); // Route to create a new album

router.post('/', createAlbum); // Route to update an album by ID

router.put('/:id', updateAlbum); // Route to delete an album by ID

router["delete"]('/:id', deleteAlbum); // Route for searching albums by artist/title

router.get('/search', searchAlbums);
module.exports = router;