"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var filterForm = document.getElementById('filterForm'); // Function to fetch albums with sorting and filtering options

  var fetchAlbums = function fetchAlbums(sort, minYear, maxYear) {
    var url = "/albums?";

    if (sort) {
      url += "sort=".concat(sort, "&");
    }

    if (minYear) {
      url += "minYear=".concat(minYear, "&");
    }

    if (maxYear) {
      url += "maxYear=".concat(maxYear, "&");
    }

    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      var albumsDiv = document.getElementById('albums');
      albumsDiv.innerHTML = ''; // Clear the albums div

      data.albums.forEach(function (album) {
        var albumElement = document.createElement('div');
        albumElement.innerHTML = "\n            <h2>".concat(album.title, "</h2>\n            <p>Artist: ").concat(album.artist, "</p>\n            <p>Year: ").concat(album.year, "</p>\n            <p>Genre: ").concat(album.genre, "</p>\n            <p>Tracks: ").concat(album.tracks, "</p>\n          ");
        albumsDiv.appendChild(albumElement);
      });
    })["catch"](function (error) {
      return console.error('Error fetching albums:', error);
    });
  }; // Listen for form submission to apply filters


  filterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var sort = document.getElementById('sort').value;
    var minYear = document.getElementById('minYear').value;
    var maxYear = document.getElementById('maxYear').value; // Fetch albums based on selected filters

    fetchAlbums(sort, minYear, maxYear);
  }); // Fetch albums on page load (without any filters initially)

  fetchAlbums();
});