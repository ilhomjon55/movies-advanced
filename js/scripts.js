// Get html elements
var elFormSearch = $_('.js-movies__form');
var elInputSearch = $_('.js-movies_search-input', elFormSearch);
var elListMovies = $_('.js-movies__list');
var elTemplateMovies = $_('#movies_template');
var elMoviesNotFoundBox = $_('.js-movies__not-found');
var elFormSelectMovies = $_('.js-form-select-movies');
var elSelectCategorie = $_('.js-select-category', elFormSelectMovies);
var elSelectRating = $_('.js-select-rating', elFormSelectMovies);


// Create element from Movies Template
var createMoviesItem = function (movie) {
   var elMoviesItem = elTemplateMovies.cloneNode(true).content;

   // Select elements from template's content and assign array element's values
   $_('.movie__heading', elMoviesItem).textContent = movie.title;
   $_('.movie__id', elMoviesItem).textContent = movie.id;
   $_('.movie__year', elMoviesItem).textContent = movie.year;
   $_('.movie__categories', elMoviesItem).textContent = movie.categories.join(', ');
   $_('.movie__summary', elMoviesItem).textContent = movie.summary;
   $_('.movie__img', elMoviesItem).src = movie.img;
   $_('.movie__img', elMoviesItem).alt = movie.title;
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
   };


   // Show the found result
   renderMovies(foundMovies);
});



/* =============================================
Selecting and Searching
============================================= */

// Get all types of categories and assign to array
var categoriesArr = [];

normalizedMovies.forEach(function (movie) {

   movie.categories.forEach(function (categorie) {

      if (!(categoriesArr.includes(categorie))) {
         categoriesArr.push(categorie);
      };
   });
});


// Create a function tha creates option elements for selects
var renderNewOptions = function () {

   var elCategoriesFragment = document.createDocumentFragment();

   categoriesArr.forEach(function (element) {
      var elNewElement = createNewEl('option', '', element);
      elNewElement.value = element;
      elCategoriesFragment.appendChild(elNewElement);
   });

   return elSelectCategorie.appendChild(elCategoriesFragment);
}

// Make the function work
renderNewOptions();


// Add event listener to elFormSelectMovies
elFormSelectMovies.addEventListener('submit', function (evt) {
   evt.preventDefault();

   // Get value of elSelectCategorie
   var selectCategorieValue = elSelectCategorie.value.trim();

   // Find category related objects 
   var selectedCategories = normalizedMovies.filter(function (movie) {
      return movie.categories.includes(selectCategorieValue);
   });

   // Render category related objects 
   renderMovies(selectedCategories);


   // Rating ==============================================

   // Get value from elSelectRating
   var selectRatingValue = elSelectRating.value.trim();


   // Create empty array to get selected Ratings
   var selectedRatings = {};

   // Validate and Filter appropriate  Rating type
   if (selectRatingValue === 'All') {
      selectedRatings = selectedCategories.map(function (movie) {
         return movie;
      });

   } else if (selectRatingValue === 'Low') {
      selectedRatings = selectedCategories.filter(function (movie) {
         return 4 > movie.imdbRating && movie.imdbRating >= 0;
      });

   } else if (selectRatingValue === 'Medium') {
      selectedRatings = selectedCategories.filter(function (movie) {
         return 7 > movie.imdbRating && movie.imdbRating >= 4;
      });

   } else if (selectRatingValue === 'High') {
      selectedRatings = selectedCategories.filter(function (movie) {
         return 10 >= movie.imdbRating && movie.imdbRating >= 7;
      });

   }

   // Add notification if nothing is found
   elMoviesNotFoundBox.classList.add('d-none');

   if (!selectedRatings.length) {
      elMoviesNotFoundBox.classList.remove('d-none');
   }

   // Make final result work
   renderMovies(selectedRatings);
});