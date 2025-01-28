export const addToFavorites = (movie) => ({
  type: 'ADD_TO_FAVORITES',
  payload: movie,
});

export const removeFromFavorites = (movie) => ({
  type: 'REMOVE_FROM_FAVORITES',
  payload: movie,
});

export const addToWatchlist = (movie) => ({
  type: 'ADD_TO_WATCHLIST',
  payload: movie,
});

export const removeFromWatchlist = (movie) => ({
  type: 'REMOVE_FROM_WATCHLIST',
  payload: movie,
});
