import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../store/auth/authContext';
import Container from 'react-bootstrap/Container';
import MovieTvCardList from '../components/MovieTvCardList';

function PreferencesPage() {
  const { state } = useContext(AuthContext);
  const { type } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (state.isAuthenticated) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(
        (user) => user.username === state.user.username
      );

      if (currentUser) {
        setMovies(
          type === 'favorites'
            ? currentUser.favorites || []
            : currentUser.watchlist || []
        );
      }
    }
  }, [state.isAuthenticated, state.user?.username, type]);

  const handleRemove = (movieId) => {
    if (!state.isAuthenticated) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.username === state.user.username
        ? {
            ...user,
            [type]: (user[type] || []).filter((movie) => movie.id !== movieId),
          }
        : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <Container className="preferences-container">
      <h1>{type === 'favorites' ? 'Your Favorites' : 'Your Watchlist'}</h1>
      {movies.length === 0 ? (
        <p>No movies in {type}.</p>
      ) : (
        <MovieTvCardList movieTvList={movies} onRemove={handleRemove} />
      )}
    </Container>
  );
}

export default PreferencesPage;
