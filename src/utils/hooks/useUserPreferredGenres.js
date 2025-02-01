import { useMemo } from 'react';

export function useUserPreferredGenres() {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const currentUser =
    users.find((u) => u.email === loggedInUser?.email) || null;

  const { movieList, tvList } = useMemo(() => {
    if (!currentUser) return { movieList: [], tvList: [] };

    const favorites = currentUser.favorites || [];
    const watchlist = currentUser.watchlist || [];
    const reviews = currentUser.reviews
      ? currentUser.reviews.filter((review) => review.mediaType)
      : [];

    const combinedList = [...favorites, ...watchlist, ...reviews];

    return {
      movieList: combinedList.filter((item) => item.mediaType === 'movie'),
      tvList: combinedList.filter((item) => item.mediaType === 'tv'),
    };
  }, [currentUser]);

  const movieGenres = useMemo(() => {
    if (movieList.length === 0) {
      return ['28', '12', '16'];
    }

    const genreCounts = movieList
      .flatMap((movie) => movie.genre_ids || [])
      .reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});

    const sortedGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([genre]) => genre);

    return sortedGenres.length > 0 ? sortedGenres : ['28', '12', '16'];
  }, [movieList]);

  const tvGenres = useMemo(() => {
    if (tvList.length === 0) {
      return ['18', '35', '9648'];
    }

    const genreCounts = tvList
      .flatMap((tvShow) => tvShow.genre_ids || [])
      .reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});

    const sortedGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([genre]) => genre);

    return sortedGenres.length > 0 ? sortedGenres : ['18', '35', '9648'];
  }, [tvList]);

  return { movieGenres, tvGenres };
}
