import { useMemo } from 'react';

export function useUserPreferredGenres() {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const currentUser =
    users.find((u) => u.email === loggedInUser?.email) || null;

  const { favorites, watchlist, reviews } = useMemo(() => {
    return {
      favorites: currentUser?.favorites || [],
      watchlist: currentUser?.watchlist || [],
      reviews: currentUser?.reviews || [],
    };
  }, [currentUser]);

  const combinedList = useMemo(() => {
    return [...favorites, ...watchlist, ...reviews].filter(
      (item) => item.genre_ids && item.genre_ids.length > 0
    );
  }, [favorites, watchlist, reviews]);

  const movieGenres = useMemo(() => {
    return combinedList
      .filter((item) => item.mediaType === 'movie')
      .flatMap((movie) => movie.genre_ids);
  }, [combinedList]);

  const tvGenres = useMemo(() => {
    return combinedList
      .filter((item) => item.mediaType === 'tv')
      .flatMap((tvShow) => tvShow.genre_ids);
  }, [combinedList]);

  const hasPreferences = useMemo(() => {
    return favorites.length > 0 || watchlist.length > 0 || reviews.length > 0;
  }, [favorites, watchlist, reviews]);

  return { movieGenres, tvGenres, hasPreferences };
}
