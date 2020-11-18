// Get html elements
var elFormSearch = $_('.js-movies__form');
var elInputSearch = $_('.js-movies_search-input', elFormSearch);
var elListMovies = $_('.js-movies__list');
var elTemplateMovies = $_('#movies_template');
var elMoviesNotFoundBox = $_('.js-movies__not-found');


// Create element from Movies Template
var createMoviesItem = function (movie) {
  var elMoviesItem = elTemplateMovies.cloneNode(true).content;

  // Select elements from template's content and assign array element's values
  $_('.movie__heading', elMoviesItem).textContent = movie.title;
  $_('.movie__id', elMoviesItem).textContent = movie.id;
  $_('.movie__year', elMoviesItem).textContent = movie.year;
  $_('.movie__categories', elMoviesItem).textContent = movie.categories.join(', ');
  $_('.movie__summary', elMoviesItem).textContent = movie.summary;
  $_('.movie__imdb-id', elMoviesItem).textContent = movie.imdbId;
  $_('.movie__imdb-rating', elMoviesItem).textContent = movie.imdbRating;
  $_('.movie__language', elMoviesItem).textContent = movie.language;
  $_('.movie__youtube-link', elMoviesItem).textContent = movie.youTubeLink;
  $_('.movie__youtube-link', elMoviesItem).setAttribute('href', `${movie.youTubeLink}`);
  $_('.movie__youtube-link', elMoviesItem).setAttribute('target', '_blank');

  return elMoviesItem;
};


// Function to render ultimate result
var renderMovies = function (movies) {
  // Empty list
  elListMovies.innerHTML = '';

  // Creater Fragment
  elMoviesFragmentBox = document.createDocumentFragment();

  // Itarate and append created elements
  movies.forEach(function (movie) {
    elMoviesFragmentBox.appendChild(createMoviesItem(movie));
  });

  // Append fragment to Movies List
  elListMovies.appendChild(elMoviesFragmentBox);
}

// Show normalizedMovies
renderMovies(normalizedMovies.slice(0, 200));


/* =====================================================
Listen submit of elFormSearch
===================================================== */

elFormSearch.addEventListener('submit', function (evt) {
  evt.preventDefault();

  // Get value of elInputSearch and assign to a var
  inputSearchValue = elInputSearch.value.trim();

  // Create searchQuery regex
  var searchQuery = new RegExp(`${inputSearchValue}`, 'gi');


  // Create array for foundMovies 
  var foundMovies = [];

  // Create forEach to find input result
  normalizedMovies.forEach(function (movie) {

    if (movie.title.match(searchQuery)) {
      foundMovies.push(movie);
    }

  });


  // Make not found result noticable
  elMoviesNotFoundBox.classList.add('d-none');

  if (!foundMovies.length) {
    elMoviesNotFoundBox.classList.remove('d-none');
  }


  // Show the found result
  renderMovies(foundMovies);
});