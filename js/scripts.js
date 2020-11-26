// Get HTML elements
var elFormMovies = $_('.js-movies__form')
var elInputSearchMovie = $_('.js-movies_search-input', elFormMovies)
var elInputRatingMovie = $_('.js-movies_rating-input', elFormMovies)
var elSelectCategory = $_('.js-select-category', elFormMovies)
var elSelectFeatures = $_('.js-select-features', elFormMovies)
var elMoviesResultList = $_('.js-movies__list')
var elBoxNotFoundMovies = $_('.js-movies__not-found')
var elMovieTemplate = $_('#movie_template').content
var elBookmarksList = $_('.bookmarks__list')

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
      imgUrl: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
      imdbId: movie.imdb_id,
      imdbRating: movie.imdb_rating,
      language: movie.language,
      trailer: `https://www.youtube.com/watch?v=${movie.ytid}`
   }
})


// Create element function
var createNewMovie = (movie) => {
   // Clone template
   elNewMovie = elMovieTemplate.cloneNode(true)

   // Assign object data to elements of template 
   $_('.movie', elNewMovie).dataset.imdbId = movie.imdbId
   $_('.movie__img', elNewMovie).src = movie.imgUrl
   $_('.movie__img', elNewMovie).alt = movie.title
   $_('.movie__heading', elNewMovie).textContent = movie.title
   $_('.movie__id', elNewMovie).textContent = movie.id
   $_('.movie__year', elNewMovie).textContent = movie.year
   $_('.movie__categories', elNewMovie).textContent = movie.categories.join(', ')
   $_('.movie__imdb-rating', elNewMovie).textContent = movie.imdbRating
   $_('.movie__youtube-link', elNewMovie).href = movie.trailer

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
renderMovies(normalizedMovies.slice(160, 200))


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


// Find movies Result validate by title, reting, category
var findResults = (inputTitle, minRating, category) => {

   var result = normalizedMovies.filter((movie) => {

      if (category === 'all') {
         var condition = movie.title.match(inputTitle) && movie.imdbRating >= minRating
      } else {
         var condition = movie.title.match(inputTitle) && movie.imdbRating >= minRating && movie.categories.includes(category)
      }

      return condition
   })

   return result

}


// Sorting Obj Alphabetical
var sortObjAlphabet = (array) => {
   return array.sort((a, b) => {
      if (a.title > b.title) {
         return 1
      } else if (a.title < b.title) {
         return -1
      }
      return 0
   })
}

// Sorting Obj by Rating
var sortObjRating = array => array.sort((a, b) => b.imdbRating - a.imdbRating)

// Sorting Obj by Year
var sortObjYear = array => array.sort((a, b) => b.year - a.year)


// Allocating sorting function according to features choice
var sortMovies = (array, features) => {
   if (features === 'all') {
      return array
   } else if (features === 'a_z') {
      return sortObjAlphabet(array)
   } else if (features === 'z_a') {
      return sortObjAlphabet(array).reverse()
   } else if (features === 'high_to_low') {
      return sortObjRating(array)
   } else if (features === 'low_to_high') {
      return sortObjRating(array).reverse()
   } else if (features === 'the_latest') {
      return sortObjYear(array)
   } else if (features === 'the_oldest') {
      return sortObjYear(array).reverse()
   }
}


/* ===================================================
Listen elFormMovies 
=================================================== */

elFormMovies.addEventListener('submit', (evt) => {
   evt.preventDefault()

   // Get input, select values
   var inputSearchMovie = elInputSearchMovie.value.trim()
   var searchQuery = new RegExp(inputSearchMovie, 'gi')
   var inputRatingMovie = Number(elInputRatingMovie.value)
   var selectCategoryValue = elSelectCategory.value
   var selectFeaturesValue = elSelectFeatures.value

   // Prevent empty input
   if (!(inputSearchMovie)) {
      alert('Please, enter text!')
      return
   }

   // Final arrays
   var foundMovies = findResults(searchQuery, inputRatingMovie, selectCategoryValue)
   var sortedMovies = sortMovies(foundMovies, selectFeaturesValue)


   // Show alert-danger when nothing is found
   elBoxNotFoundMovies.classList.add('d-none')

   if (!(sortedMovies.length)) {
      elMoviesResultList.innerHTML = ''
      elBoxNotFoundMovies.classList.remove('d-none')
      return
   }


   // Render a final result
   renderMovies(sortedMovies)


})



// Clone bookmark template
var elBookmarkTemplate = $_('#bookamrks__template').content


// Create bookmark function ============================
var createNewBookmark = movie => {
   // Clone template
   elNewBookmark = elBookmarkTemplate.cloneNode(true)

   // Assign object data to elements of template 
   $_('.bookmarks__item', elNewBookmark).dataset.imdbId = movie.imdbId
   $_('.bookmarks__title', elNewBookmark).textContent = movie.title
   $_('.bookmark__remove', elNewBookmark).dataset.imdbId = movie.imdbId

   return elNewBookmark
}


// Global render movies function =============================
var renderBookmarks = movies => {

   elBookmarksList.innerHTML = ''

   var elFragementMovies = document.createDocumentFragment()

   movies.forEach(movie => {
      elFragementMovies.appendChild(createNewBookmark(movie))
   })

   return elBookmarksList.appendChild(elFragementMovies)
}


// Create golabal bookmarks Array 
let bookmarksArr = []


// Get movie modal element
var elMovieModal = $_('.movie-modal')


// Validate wethear movie is added
var doesMovieBookmarked = (foundMovie) => {

   var doesExist = false
   bookmarksArr.forEach(movie => {
      if (movie.imdbId === foundMovie.imdbId) {
         doesExist = true
      }

   })

   // Push if movie does not exist
   if (!(doesExist)) {
      bookmarksArr.push(foundMovie)
   }
}


// Listen elMoviesResultList =================================
elMoviesResultList.addEventListener('click', (evt) => {

   // Match more btn and assign values
   if (evt.target.matches('.movie__btn-more')) {

      // Get closest li
      var elClosestMovieLi = evt.target.closest('.movies__item')

      // Find clicked li
      var foundMovie = normalizedMovies.find((movie) => {
         return movie.imdbId === elClosestMovieLi.dataset.imdbId
      })

      // Assign values to li
      $_('.modal-title', elMovieModal).textContent = foundMovie.title
      $_('.modal-summary', elMovieModal).textContent = foundMovie.summary
      $_('.modal-categories', elMovieModal).textContent = foundMovie.categories.join(', ')
      $_('.modal-trailer', elMovieModal).href = foundMovie.trailer
      $_('.modal-language', elMovieModal).textContent = foundMovie.language
      $_('.modal-released-year', elMovieModal).textContent = foundMovie.year
      $_('.modal-imdb-id', elMovieModal).textContent = foundMovie.imdbId
      $_('.modal-imdb-rating', elMovieModal).textContent = foundMovie.imdbRating


   } else if (evt.target.matches('.movie__bookmark')) {

      var elBookmark = evt.target.closest('li')

      // Find bookmarked movie
      var foundMovie = normalizedMovies.find((movie) => {
         return movie.imdbId === elBookmark.dataset.imdbId
      })


      doesMovieBookmarked(foundMovie)
      renderBookmarks(bookmarksArr)
   }


})


// Listen elBookmarksList ===================================
elBookmarksList.addEventListener('click', (evt) => {

   if (evt.target.matches('.bookmark__remove')) {

      // Delete choosed li
      var elBookmarkLi = evt.target.closest('li')
      elBookmarkLi.remove()

      // Find deletable li's object
      var foundBookmark = bookmarksArr.find(movie => {
         return movie.imdbId === elBookmarkLi.dataset.imdbId
      })

      // Find that object and splice from array as well
      bookmarksArr.forEach((movie, index) => {
         if (movie.imdbId === foundBookmark.imdbId)
            bookmarksArr.splice(index, 1)
      })
   }

})