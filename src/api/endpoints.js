const API_KEY = '240dbb18886b7bb0b88b955605c8d3cc';

export function getItemsByCategoryEndpoint(category, pageNumber = 1) {
  const queryParams = `?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
  return `https://api.themoviedb.org/3/${category}/popular${queryParams}`;
}

export function getGenresEndpoint(category) {
  return `https://api.themoviedb.org/3/genre/${category}/list?api_key=${API_KEY}&language=en-US`;
}

export function getMovieTvDetailsEndpoint(category, itemId) {
  return `https://api.themoviedb.org/3/${category}/${itemId}?api_key=${API_KEY}&language=en-US`;
}

export function getReviewsEndpoint(category, itemId) {
  return `https://api.themoviedb.org/3/${category}/${itemId}/reviews?api_key=${API_KEY}&language=en-US`;
}

export function getTrendingMovies() {
  return `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US`;
}

export function getTrendingTVShows() {
  return `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en-US`;
}

export function getTopRatedMovies() {
  return `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`;
}

export function getTopRatedTVShows() {
  return `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`;
}

export function getMoviesByGenres(genres, pageNumber = 1) {
  if (!Array.isArray(genres) || genres.length === 0) {
    return null;
  }

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${pageNumber}&with_genres=${genres.join(
    ','
  )}`;

  return url;
}

export function getTVShowsByGenres(genres, pageNumber = 1) {
  if (!Array.isArray(genres) || genres.length === 0) {
    return null;
  }

  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=${pageNumber}&with_genres=${genres.join(
    ','
  )}`;

  return url;
}
