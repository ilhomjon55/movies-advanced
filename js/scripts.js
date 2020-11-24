// Get HTML elements
var elFormMovies = $_('.js-movies__form')
var elInputSearchMovie = $_('.js-movies_search-input', elFormMovies)
var elInputRatingMovie = $_('.js-movies_rating-input', elFormMovies)
var elSelectCategory = $_('.js-select-category', elFormMovies)
var elSelectFeatures = $_('.js-select-features', elFormMovies)
var elMoviesResultList = $_('.js-movies__list')
var elBoxNotFoundMovies = $_('.js-movies__not-found')
var elMovieTemplate = $_('#movie_template').content


/* =======================================================
Normalize Movies Array
======================================================= */

var normalizedMovies = movies.map((movie, i) => {
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
var createNewMovie = (movie) => {
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
var renderMovies = (movies) => {

   elMoviesResultList.innerHTML = ''

   var elFragementMovies = document.createDocumentFragment()

   movies.forEach((movie) => {
      elFragementMovies.appendChild(createNewMovie(movie))
   })

   return elMoviesResultList.appendChild(elFragementMovies)
}

// Render first 100 of movies
renderMovies(normalizedMovies.slice(0, 100))


// Assign all categories to an array
var movieCategories = []

normalizedMovies.forEach((movie) => {

   movie.categories.forEach((category) => {

      if (!(movieCategories.includes(category))) {
         movieCategories.push(category)
      }

   })

})

// Sort the categories array
movieCategories.sort()

// Function to create option elements and append to select
var createElOption = (arr, elAppend) => {
   var elCategoryOptions = document.createDocumentFragment();

   arr.forEach((category) => {
      var elNewOption = createNewEl('option', ' ', category)
      elNewOption.value = category
      elCategoryOptions.appendChild(elNewOption)
   })


   return elAppend.appendChild(elCategoryOptions)
}


// Add movieCategories to elSelectCategory
createElOption(movieCategories, elSelectCategory)


var findResults = (inputTitle, minRating, category) => {

   return normalizedMovies.filter((movie) => {

      if (category === 'all') {
         var condition = movie.title.match(inputTitle) && movie.imdb_rating >= minRating
      } else {
         var condition = movie.title.match(inputTitle) && movie.imdb_rating >= minRating && movie.categories.includes(category)
      }

      return condition
   })

}


/* ===================================================
Listen elFormMovies 
=================================================== */

elFormMovies.addEventListener('submit', (evt) => {
   evt.preventDefault()


   // Get select values
   var inputSearchMovie = elInputSearchMovie.value.trim()
   var searchQuery = new RegExp(inputSearchMovie, 'gi')
   var inputRatingMovie = Number(elInputRatingMovie.value)
   var selectCategoryValue = elSelectCategory.value
   // var selectFeaturesValue = elSelectFeatures.value

   // Prevent form empty input
   if (!(inputSearchMovie)) {
      alert('Please, enter an appropriate name of movie!')
      return
   }


   var foundMovies = findResults(searchQuery, inputRatingMovie, selectCategoryValue)


   renderMovies(foundMovies)

})























// // Show alert-danger when nothing is found
// elBoxNotFoundMovies.classList.add('d-none')

// if (!(foundMovies.length)) {
//    elBoxNotFoundMovies.classList.remove('d-none')
// }