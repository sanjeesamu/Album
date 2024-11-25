document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('filterForm');

  // Function to fetch albums with sorting and filtering options
  const fetchAlbums = (sort, minYear, maxYear) => {
    let url = `/albums?`;
    
    if (sort) {
      url += `sort=${sort}&`;
    }
    if (minYear) {
      url += `minYear=${minYear}&`;
    }
    if (maxYear) {
      url += `maxYear=${maxYear}&`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const albumsDiv = document.getElementById('albums');
        albumsDiv.innerHTML = ''; // Clear the albums div

        data.albums.forEach(album => {
          const albumElement = document.createElement('div');
          albumElement.innerHTML = `
            <h2>${album.title}</h2>
            <p>Artist: ${album.artist}</p>
            <p>Year: ${album.year}</p>
            <p>Genre: ${album.genre}</p>
            <p>Tracks: ${album.tracks}</p>
          `;
          albumsDiv.appendChild(albumElement);
        });
      })
      .catch(error => console.error('Error fetching albums:', error));
  };

  // Listen for form submission to apply filters
  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const sort = document.getElementById('sort').value;
    const minYear = document.getElementById('minYear').value;
    const maxYear = document.getElementById('maxYear').value;

    // Fetch albums based on selected filters
    fetchAlbums(sort, minYear, maxYear);
  });

  // Fetch albums on page load (without any filters initially)
  fetchAlbums();
});
