import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../store/auth/authContext';

export function useRecentlyViewed() {
  const { state } = useContext(AuthContext);
  const [recentMovies, setRecentMovies] = useState([]);
  const [recentTVShows, setRecentTVShows] = useState([]);

  useEffect(() => {
    if (!state.isAuthenticated || !state.user) {
      setRecentMovies([]);
      setRecentTVShows([]);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(
      (user) => user.username === state.user.username
    );

    if (!currentUser || !currentUser.recentlyViewed) {
      setRecentMovies([]);
      setRecentTVShows([]);
      return;
    }

    const movies = currentUser.recentlyViewed.filter(
      (item) => item.mediaType === 'movie'
    );
    const tvShows = currentUser.recentlyViewed.filter(
      (item) => item.mediaType === 'tv'
    );

    setRecentMovies(movies);
    setRecentTVShows(tvShows);
  }, [state.isAuthenticated, state.user]);

  return { recentMovies, recentTVShows };
}
