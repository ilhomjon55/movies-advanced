// Get HTML elements
var elFormMovies = $_('.js-movies__form')
var elInputSearchMovie = $_('.js-movies_search-input', elFormMovies)
var elFormSelectMovies = $_('.js-form-select-movies')
var elSelectCategory = $_('.js-select-category', elFormSelectMovies)
var elSelectFeatures = $_('.js-select-features', elFormSelectMovies)
var elMoviesResultList = $_('.js-movies__list')
var elBoxNotFoundMovies = $_('.js-movies__not-found')
var elMovieTemplate = $_('#movie_template').content


/* =======================================================
Normalize Movies Array
======================================================= */

var normalizedMovies = movies.map(function (movie, i) {
   return {
      id: i + 1,
      title: movie.Title.toString(),
      year: movie.movie_year,
      categories: movie.Categories.split('|'),
      summary: movie.summary,
      img_url: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
      imdb_id: movie.imdb_id,
      imdb_rating: movie.imdb_rating,
      language: movie.language,
      trailer: `https://www.youtube.com/watch?v=${movie.ytid}`
   }
})


// Create element function
var createNewMovie = function (movie) {
   // Clone template
   elNewMovie = elMovieTemplate.cloneNode(true)

   // Assign object data to elements of template 
   $_('.movie__img', elNewMovie).src = movie.img_url
   $_('.movie__img', elNewMovie).alt = movie.title
   $_('.movie__heading', elNewMovie).textContent = movie.title
   $_('.movie__id', elNewMovie).textContent = movie.id
   $_('.movie__year', elNewMovie).textContent = movie.year
   $_('.movie__categories', elNewMovie).textContent = movie.categories.join(', ')
   $_('.movie__summary', elNewMovie).textContent = movie.summary
   $_('.movie__imdb-id', elNewMovie).textContent = movie.imdb_id
   $_('.movie__imdb-rating', elNewMovie).textContent = movie.imdb_rating
   $_('.movie__youtube-link', elNewMovie).textContent = movie.trailer
   $_('.movie__youtube-link', elNewMovie).href = movie.trailer
   $_('.movie__language', elNewMovie).textContent = movie.language

   return elNewMovie
}


// Global render movies function
var renderMovies = function (movies) {

   elMoviesResultList.innerHTML = ''

   var elFragementMovies = document.createDocumentFragment()

   movies.forEach(function (movie) {
      elFragementMovies.appendChild(createNewMovie(movie))
   })

   return elMoviesResultList.appendChild(elFragementMovies)
}

// Render first 100 of movies
renderMovies(normalizedMovies.slice(0, 100))


// Declare foundMovies Global to sort them then
var foundMovies = []


/* =======================================================
Listen elFormMovies
======================================================= */

elFormMovies.addEventListener('submit', function (evt) {
   evt.preventDefault()

   // Get value of elInputSearchMovie
   var inputSearchMovie = elInputSearchMovie.value.trim()

   // Prevent form empty input
   if (!(inputSearchMovie)) {
      alert('Please, enter an appropriate name of movie!')
      return
   }


   // Search query
   var searchQuery = new RegExp(inputSearchMovie, 'gi')

   // Filter searched movies
   foundMovies = normalizedMovies.filter(function (movie) {
      return movie.title.match(searchQuery)
   })

   // Render found movies
   renderMovies(foundMovies)


   // Show alert-danger when nothing is found
   elBoxNotFoundMovies.classList.add('d-none')

   if (!(foundMovies.length)) {
      elBoxNotFoundMovies.classList.remove('d-none')
   }



})



// Assign all categories to an array
var movieCategories = []

normalizedMovies.forEach(function (movie) {

   movie.categories.forEach(function (category) {

      if (!(movieCategories.includes(category))) {
         movieCategories.push(category)
      }

   })

})


// Function to create option elements and append to select
var createElOption = function (arr, elAppend) {
   var elCategoryOptions = document.createDocumentFragment();

   arr.forEach(function (category) {
      var elNewOption = createNewEl('option', ' ', category)
      elNewOption.value = category
      elCategoryOptions.appendChild(elNewOption)
   })


   return elAppend.appendChild(elCategoryOptions)
}


// Add movieCategories to elSelectCategory
createElOption(movieCategories, elSelectCategory)


/* ===================================================
Listen elFormSelectMovies 
=================================================== */

elFormSelectMovies.addEventListener('submit', function (evt) {
   evt.preventDefault()

   // Get select values
   var selectCategoryValue = elSelectCategory.value
   var selectFeaturesValue = elSelectFeatures.value

   // Work when even nothing is searched
   if (!(foundMovies.length)) {
      foundMovies = normalizedMovies.slice(0, 100).map(function (movie) {
         return movie
      })
   }

   // Categories =======================================

   // Filter categories
   var foundMoviesCategories = foundMovies.filter(function (movie) {
      return movie.categories.includes(selectCategoryValue);
   })


   if (selectCategoryValue === 'all') {
      foundMoviesCategories = foundMovies.map(function (movie) {
         return movie
      })

      renderMovies(foundMoviesCategories)
   }


   // Features ============================================

   // Create empty array to render for the end
   var foundMoviesCategoriesFeatures = []


   if (selectFeaturesValue === 'all') {

      renderMovies(foundMoviesCategories)

   } else if (selectFeaturesValue === 'a_z') {

      foundMoviesCategoriesFeatures = foundMoviesCategories.sort(function (a, b) {
         if (a.title > b.title) {
            return 1
         } else if (a.title < b.title) {
            return -1
         } else {
            return 0
         }
      })
      renderMovies(foundMoviesCategoriesFeatures)

   } else if (selectFeaturesValue === 'z_a') {

      foundMoviesCategoriesFeatures = foundMoviesCategories.sort(function (b, a) {
         if (a.title > b.title) {
            return 1
         } else if (a.title < b.title) {
            return -1
         } else {
            return 0
         }
      })
      renderMovies(foundMoviesCategoriesFeatures)

   } else if (selectFeaturesValue === 'the_latest') {

      foundMoviesCategoriesFeatures = foundMoviesCategories.sort(function (a, b) {
         return b.year - a.year
      })
      renderMovies(foundMoviesCategoriesFeatures)

   } else if (selectFeaturesValue === 'the_oldest') {

      var foundMoviesCategoriesFeatures = foundMoviesCategories.sort(function (a, b) {
         return a.year - b.year
      })
      renderMovies(foundMoviesCategoriesFeatures)

   } else if (selectFeaturesValue === 'highest_to_lowest') {

      foundMoviesCategoriesFeatures = foundMoviesCategories.sort(function (a, b) {
         return b.imdb_rating - a.imdb_rating
      })
      renderMovies(foundMoviesCategoriesFeatures)

   } else if (selectFeaturesValue === 'lowest_to_highest') {

      foundMoviesCategoriesFeatures = foundMoviesCategories.sort(function (a, b) {
         return a.imdb_rating - b.imdb_rating
      })
      renderMovies(foundMoviesCategoriesFeatures)

   }


})