// Get HTML elements
var elFormMovies = $_('.js-movies__form')
var elInputSearchMovie = $_('.js-movies_search-input', elFormMovies)
var elFormSelectMovies = $_('.js-form-select-movies', elFormSelectMovies)
var elSelectCategory = $_('.js-select-category')
var elSelectRating = $_('.js-select-rating')
var elSelectAlphabet = $_('.js-select-alphabet')
var elSelectYear = $_('.js-select-year')
var elMoviesResultList = $_('.js-movies__list')
var elBoxNotFoundMovies = $_('.js-movies__not-found')
var elMovieTemplate = $_('#movie_template').content


// Normalize Movies Array
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
   elNewMovie = elMovieTemplate.cloneNode(true)

   $_('.movie__img', elNewMovie).src = movie.img_url
   $_('.movie__img', elNewMovie).alt = movie.title
   $_('.movie__heading', elNewMovie).textContent = movie.title
   $_('.movie__id', elNewMovie).textContent = movie.id
   $_('.movie__year', elNewMovie).textContent = movie.year
   $_('.movie__categories', elNewMovie).textContent = movie.categories
   $_('.movie__summary', elNewMovie).textContent = movie.summary
   $_('.movie__imdb-id', elNewMovie).textContent = movie.imdb_id
   $_('.movie__imdb-rating', elNewMovie).textContent = movie.imdb_rating
   $_('.movie__youtube-link', elNewMovie).textContent = movie.trailer
   $_('.movie__language', elNewMovie).textContent = movie.language

   return elNewMovie
}


var renderMovies = function (movies) {

   elMoviesResultList.innerHTML = ''

   var elFragementMovies = document.createDocumentFragment()

   elFragementMovies.appendChild(movies.forEach(createNewMovie(movie)))

   elMoviesResultList.appendChild(elFragementMovies)
}



renderMovies(normalizedMovies)
// Listen elFormMovies
elFormMovies.addEventListener('submit', function (evt) {
   evt.preventDefault()

   // Get value of elInputSearchMovie
   var inputSearchMovie = elInputSearchMovie.value.trim()

   // Prevent form empty input
   if (!inputSearchMovie) {
      alert('Please, enter an appropriate name of movie!')
      return
   }









})