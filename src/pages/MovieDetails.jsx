import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getMovieTvDetailsEndpoint,
  getGenresEndpoint,
  getReviewsEndpoint,
} from '../api/endpoints';
import { useFetch } from '../utils/hooks/useFetch';
import { getMovieTvDetails } from '../api/adaptors';
import { AuthContext } from '../store/auth/authContext';
import { ReviewsContext } from '../store/reviews/reviewsContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FavoritesWatchlistContext } from '../store/favorites/favoritesContext';
import {
  addToFavorites,
  addToWatchlist,
} from '../store/favorites/favoritesActions';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

import './MovieDetails.css';

function MovieTvDetails() {
  const { state } = useContext(AuthContext);
  const { reviewState, reviewDispatch } = useContext(ReviewsContext);
  const { category, itemId } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [submittedReview, setSubmittedReview] = useState(false);
  const [movieTvDetails, setMovieTvDetails] = useState({});
  const { favoritesWatchlistDispatch } = useContext(FavoritesWatchlistContext);
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, visible: true });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, 2000);
  };

  const movieDetailsEndpoint = getMovieTvDetailsEndpoint(category, itemId);
  const {
    data: fetchedMovieTvDetails,
    loading,
    error,
  } = useFetch(movieDetailsEndpoint);

  const genresEndpoint = getGenresEndpoint(category);
  const {
    data: genresData,
    loading: genresLoading,
    error: genresError,
  } = useFetch(genresEndpoint);

  const reviewsEndpoint = getReviewsEndpoint(category, itemId);
  const {
    data: reviewsData,
    loading: reviewsLoading,
    error: reviewsError,
  } = useFetch(reviewsEndpoint);

  useEffect(() => {
    if (!fetchedMovieTvDetails || !genresData || !genresData.genres) {
      return;
    }
    const storedMovies = JSON.parse(localStorage.getItem('movieRatings')) || {};
    const storedMovieData = storedMovies[itemId];

    const genreList = genresData.genres;
    const movieData = getMovieTvDetails(fetchedMovieTvDetails, genreList);

    setMovieTvDetails({
      ...movieData,
      voteAverage: storedMovieData?.voteAverage || movieData.voteAverage,
      voteCount: storedMovieData?.voteCount || movieData.voteCount,
    });
  }, [fetchedMovieTvDetails, genresData, itemId]);

  useEffect(() => {
    if (state.isAuthenticated) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(
        (user) => user.username === state.user.username
      );
      const movieReviews = currentUser?.reviews || [];
      const filteredReview = movieReviews.filter(
        (review) => review.movieId === itemId
      );

      if (filteredReview.length > 0) {
        reviewDispatch({
          type: 'SET_USER_REVIEWS',
          payload: filteredReview,
        });
      }
    }
  }, [state.isAuthenticated, state.user?.username, itemId, reviewDispatch]);

  useEffect(() => {
    if (
      !movieTvDetails ||
      !movieTvDetails.id ||
      !state.isAuthenticated ||
      !state.user
    )
      return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUserIndex = users.findIndex(
      (user) => user.username === state.user.username
    );
    if (currentUserIndex === -1) return;

    const currentUser = users[currentUserIndex];
    const viewedItems = currentUser.recentlyViewed || [];

    const isAlreadyViewed = viewedItems.some(
      (item) => item.id === movieTvDetails.id
    );

    if (!isAlreadyViewed) {
      const updatedViewedItems = [
        {
          id: movieTvDetails.id,
          title: movieTvDetails.title,
          mediaType: movieTvDetails.mediaType,
          imageUrl: movieTvDetails.imageUrl,
          voteAverage: movieTvDetails.voteAverage,
          timestamp: new Date().getTime(),
        },
        ...viewedItems,
      ].slice(0, 20);

      users[currentUserIndex] = {
        ...currentUser,
        recentlyViewed: updatedViewedItems,
      };

      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [movieTvDetails, state.isAuthenticated, state.user]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movieRatings')) || {};
    if (storedMovies[itemId]) {
      setMovieTvDetails((prevDetails) => ({
        ...prevDetails,
        voteAverage: storedMovies[itemId].voteAverage,
        voteCount: storedMovies[itemId].voteCount,
      }));
    }
  }, [itemId]);

  if (loading || genresLoading) return <div>Loading...</div>;
  if (error || genresError)
    return <div>{error ? error.message : genresError.message}</div>;

  if (!movieTvDetails || !genresData || !reviewsData)
    return <div>No data available</div>;

  const { title, description, imageUrl, voteAverage, voteCount, genres } =
    movieTvDetails;

  const handleSubmitReview = (event) => {
    event.preventDefault();

    if (comment && userRating) {
      let genreIds = Array.isArray(movieTvDetails.genre_ids)
        ? movieTvDetails.genre_ids.filter(
            (id) => id !== null && id !== undefined
          )
        : [];

      if (genreIds.length === 0 && Array.isArray(movieTvDetails.genres)) {
        genreIds = movieTvDetails.genres
          .map((genre) => genre.id)
          .filter((id) => id !== null && id !== undefined);
      }

      const parsedRating = parseFloat(userRating);

      if (!comment || parsedRating < 1 || parsedRating > 10) {
        showAlert(
          'Please enter a valid rating between 1 and 10, and a comment.',
          'error'
        );
        return;
      }

      const review = {
        movieId: itemId,
        comment,
        rating: parsedRating,
        username: state.user.username,
        mediaType: category,
        genre_ids: genreIds.length > 0 ? genreIds : ['Unknown'],
      };

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map((user) =>
        user.username === state.user.username
          ? {
              ...user,
              reviews: [
                ...(user.reviews || []).filter((r) => r.movieId !== itemId),
                review,
              ],
            }
          : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      reviewDispatch({
        type: 'ADD_REVIEW',
        payload: review,
      });

      updateMovieRating(parsedRating);

      setUserRating(0);
      setComment('');
      setSubmittedReview(true);
    } else {
      showAlert('Please enter both a comment and a rating.', 'error');
    }
  };

  const updateMovieRating = (newRating) => {
    const existingReviews = [...reviewState.reviews, { rating: newRating }];
    const totalRatings = existingReviews.length;
    const sumRatings = existingReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const updatedRating = (sumRatings / totalRatings).toFixed(1);

    const newVoteCount = movieTvDetails.voteCount + 1;

    setMovieTvDetails((prevDetails) => ({
      ...prevDetails,
      voteAverage: updatedRating,
      voteCount: newVoteCount,
    }));

    const storedMovies = JSON.parse(localStorage.getItem('movieRatings')) || {};
    storedMovies[itemId] = {
      voteAverage: updatedRating,
      voteCount: newVoteCount,
    };
    localStorage.setItem('movieRatings', JSON.stringify(storedMovies));
  };

  const handleAddToFavoritesButton = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const currentUser = users.find(
      (user) => user.username === state.user.username
    );

    if (currentUser) {
      const movieAlreadyInFavorites = currentUser.favorites?.some(
        (movie) => movie.id === movieTvDetails.id
      );

      if (!movieAlreadyInFavorites) {
        const updatedUsers = users.map((user) =>
          user.username === state.user.username
            ? {
                ...user,
                favorites: [...(user.favorites || []), movieTvDetails],
              }
            : user
        );

        localStorage.setItem('users', JSON.stringify(updatedUsers));

        favoritesWatchlistDispatch(addToFavorites(movieTvDetails));
        showAlert('Added to Favorites!', 'success');
      } else {
        showAlert('This movie is already in your favorites!', 'warning');
      }
    } else {
      showAlert('User not found.', 'error');
    }
  };

  const handleAddToWatchlistButton = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const currentUser = users.find(
      (user) => user.username === state.user.username
    );

    if (currentUser) {
      const movieAlreadyInWatchlist = currentUser.watchlist?.some(
        (movie) => movie.id === movieTvDetails.id
      );

      if (!movieAlreadyInWatchlist) {
        const updatedUsers = users.map((user) =>
          user.username === state.user.username
            ? {
                ...user,
                watchlist: [...(user.watchlist || []), movieTvDetails],
              }
            : user
        );

        localStorage.setItem('users', JSON.stringify(updatedUsers));

        favoritesWatchlistDispatch(addToWatchlist(movieTvDetails));
        showAlert('Added to Watchlist!', 'success');
      } else {
        showAlert('This movie is already in your watchlist!', 'warning');
      }
    } else {
      showAlert('User not found.', 'error');
    }
  };

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + ' [...]';
    }
    return text;
  };

  const shareUrl = window.location.href;

  return (
    <Container className="movie-container">
      {alert.visible && (
        <div className={`custom-alert ${alert.type}`}>
          {alert.message}
          <button
            className="close-alert"
            onClick={() => setAlert({ ...alert, visible: false })}
          >
            ×
          </button>
        </div>
      )}

      <h1 className="title">{title}</h1>
      <div className="movie-details-container">
        <div className="image-container">
          {imageUrl && <img src={imageUrl} alt={title} className="img-fluid" />}
        </div>

        <div className="text-container">
          <p>
            <strong>Genres:</strong>{' '}
            {genres && genres.length > 0
              ? genres.join(', ')
              : 'No genres available'}
          </p>
          <p>
            <strong>Description: </strong> {description}
          </p>
          <p>
            <strong>Rating:</strong>{' '}
            {Number(voteAverage) ? Number(voteAverage).toFixed(2) : 'N/A'} (
            {voteCount} votes)
          </p>

          {state.isAuthenticated && (
            <div className="actions-container">
              <Button
                className="buttons favorites-button"
                onClick={handleAddToFavoritesButton}
              >
                Add to Favorites
              </Button>
              <Button className="buttons" onClick={handleAddToWatchlistButton}>
                Add to Watchlist
              </Button>
              <div className="share-buttons">
                <p>
                  <strong>Share:</strong>
                </p>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="social-icon facebook" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="social-icon twitter" />
                </a>
                <a
                  href={`https://wa.me/?text=${title} - ${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="social-icon whatsapp" />
                </a>
              </div>
            </div>
          )}
        </div>

        {state.isAuthenticated && (
          <>
            <div className="review-section">
              <h3>Leave a review</h3>
              <div className="rating-section">
                <strong>Your rating: </strong>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="rating-input"
                  onChange={(e) => setUserRating(e.target.value)}
                  value={userRating}
                />
                <span> / 10</span>
              </div>

              <div className="comments-section">
                <strong>Leave a Comment</strong>
                <textarea
                  placeholder="Write your comment here"
                  rows="3"
                  className="comment-input"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </div>

              <Button
                className="buttons submit-review-button"
                onClick={handleSubmitReview}
              >
                Submit Review
              </Button>
            </div>
          </>
        )}

        <div className="reviews-container">
          <h3>Reviews</h3>

          {reviewState.reviews && reviewState.reviews.length > 0
            ? reviewState.reviews
                .filter((review) => review.movieId === itemId)
                .map((review, index) => (
                  <div key={index} className="review">
                    <p>
                      <strong>Author:</strong> {review.username}
                    </p>
                    <p>
                      <strong>Rating:</strong> {review.rating}/10
                    </p>
                    <p>
                      <strong>Comment:</strong> {review.comment}
                    </p>
                  </div>
                ))
            : null}

          {reviewsLoading && <p>Loading TMDB reviews...</p>}
          {reviewsError && <p>Error loading reviews: {reviewsError.message}</p>}

          {reviewsData &&
          reviewsData.results &&
          reviewsData.results.length > 0 ? (
            reviewsData.results.map((review) => (
              <div key={review.id} className="review">
                <p>
                  <strong>Author:</strong> {review.author}
                </p>
                <p>
                  <strong>Rating:</strong>{' '}
                  {review.author_details.rating || 'N/A'} /10
                </p>
                <p>{truncateText(review.content, 300)}</p>
              </div>
            ))
          ) : (
            <p>No reviews found from TMDB.</p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default MovieTvDetails;
