import { useMemo } from 'react';

export function useUserPreferredGenres() {
  const loggedInUser = useMemo(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  }, []);

  const users = useMemo(() => {
    return JSON.parse(localStorage.getItem('users')) || [];
  }, []);

  const currentUser = useMemo(() => {
    return users.find((u) => u.username === loggedInUser?.username) || null;
  }, [users, loggedInUser?.username]);

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

  const hasMoviePreferences = useMemo(
    () => movieGenres.length > 0,
    [movieGenres]
  );
  const hasTVPreferences = useMemo(() => tvGenres.length > 0, [tvGenres]);

  const hasPreferences = useMemo(() => {
    return hasMoviePreferences || hasTVPreferences;
  }, [hasMoviePreferences, hasTVPreferences]);

  return {
    movieGenres,
    tvGenres,
    hasPreferences,
    hasMoviePreferences,
    hasTVPreferences,
  };
}
