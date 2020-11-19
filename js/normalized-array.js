var normalizedMovies = movies.map(function (movie, i) {
   return {
      id: i + 1,
      title: movie.Title.toString(),
      year: movie.movie_year,
      categories: movie.Categories.split('|'),
      summary: movie.summary,
      img: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
      imdbId: movie.imdb_id,
      imdbRating: movie.imdb_rating,
      language: movie.language,
      youTubeLink: `https://www.youtube.com/watch?v=${movie.ytid}`
   }

});