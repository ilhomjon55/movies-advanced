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

console.log(normalizedMovies)