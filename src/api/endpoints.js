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
