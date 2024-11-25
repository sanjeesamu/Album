"use strict";

var Album = require('../models/Album'); // Get all albums with optional sorting and filtering


var getAlbums = function getAlbums(req, res) {
  var _req$query, sort, minYear, maxYear, fields, filter, allowedSortFields, sortOptions, selectedFields, albums;

  return regeneratorRuntime.async(function getAlbums$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, sort = _req$query.sort, minYear = _req$query.minYear, maxYear = _req$query.maxYear, fields = _req$query.fields; // Initialize a filter object for the year

          filter = {};

          if (minYear || maxYear) {
            filter.year = {};
            if (minYear) filter.year.$gte = parseInt(minYear); // Year greater than or equal to minYear

            if (maxYear) filter.year.$lte = parseInt(maxYear); // Year less than or equal to maxYear
          } // Sort options (allowable fields)


          allowedSortFields = ['artist', 'year', 'title', 'genre'];
          sortOptions = {};

          if (allowedSortFields.includes(sort)) {
            sortOptions[sort] = 1;
          } // Select only the fields requested by the client


          selectedFields = '';

          if (fields) {
            selectedFields = fields.split(',').join(' '); // Convert 'artist,title' to 'artist title'
          } // Apply filtering, sorting, and field selection


          _context.next = 10;
          return regeneratorRuntime.awrap(Album.find(filter).sort(sortOptions).select(selectedFields));

        case 10:
          albums = _context.sent;
          res.status(200).json({
            albums: albums
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Create a new album


var createAlbum = function createAlbum(req, res) {
  var album;
  return regeneratorRuntime.async(function createAlbum$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          album = new Album(req.body);
          _context2.next = 3;
          return regeneratorRuntime.awrap(album.save());

        case 3:
          // This line can throw a validation error if the data is invalid
          res.status(201).json({
            album: album
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Update an album


var updateAlbum = function updateAlbum(req, res) {
  var album;
  return regeneratorRuntime.async(function updateAlbum$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Album.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 2:
          album = _context3.sent;

          if (album) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Album not found'
          }));

        case 5:
          res.status(200).json({
            album: album
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Delete an album


var deleteAlbum = function deleteAlbum(req, res) {
  var album;
  return regeneratorRuntime.async(function deleteAlbum$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Album.findByIdAndDelete(req.params.id));

        case 2:
          album = _context4.sent;

          if (album) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Album not found'
          }));

        case 5:
          res.status(200).json({
            message: 'Album deleted successfully'
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // Search Albums with additional filters


var searchAlbums = function searchAlbums(req, res) {
  var _req$query2, fields, search, startYear, endYear, query, regex, albumsQuery, fieldsList, albums;

  return regeneratorRuntime.async(function searchAlbums$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$query2 = req.query, fields = _req$query2.fields, search = _req$query2.search, startYear = _req$query2.startYear, endYear = _req$query2.endYear; // Create a query object

          query = {}; // Search for artist names or album titles using regex if 'search' query param is provided

          if (search) {
            regex = new RegExp(search, 'i'); // 'i' makes it case-insensitive

            query.$or = [{
              artist: regex
            }, // Match pattern in artist field
            {
              title: regex
            } // Match pattern in title field
            ];
          } // Filter albums by release year range


          if (startYear || endYear) {
            query.year = {}; // If startYear is provided, set it as the minimum year

            if (startYear) {
              query.year.$gte = parseInt(startYear, 10); // Greater than or equal to startYear
            } // If endYear is provided, set it as the maximum year


            if (endYear) {
              query.year.$lte = parseInt(endYear, 10); // Less than or equal to endYear
            }
          } // Perform the database query with field selection, regex search, and year filtering


          albumsQuery = Album.find(query); // Handle fields selection

          if (fields) {
            fieldsList = fields.split(',').join(' '); // Convert "artist,title" to "artist title"

            albumsQuery = albumsQuery.select(fieldsList);
          } // Execute the query


          _context5.next = 8;
          return regeneratorRuntime.awrap(albumsQuery);

        case 8:
          albums = _context5.sent;
          // Return the albums
          res.status(200).json({
            albums: albums
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  getAlbums: getAlbums,
  createAlbum: createAlbum,
  updateAlbum: updateAlbum,
  deleteAlbum: deleteAlbum,
  searchAlbums: searchAlbums
};