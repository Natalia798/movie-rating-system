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
import './MovieDetails.css';

function MovieTvDetails() {
  const { state } = useContext(AuthContext);
  const { reviewState, reviewDispatch } = useContext(ReviewsContext);
  const { category, itemId } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);

  const movieDetailsEndpoint = getMovieTvDetailsEndpoint(category, itemId);
  const {
    data: movieTvDetails,
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
    if (submittedReview && state.isAuthenticated) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(
        (user) => user.username === state.user.username
      );
      reviewDispatch({
        type: 'SET_USER_REVIEWS',
        payload: currentUser?.reviews || [],
      });
      setSubmittedReview(false);
    }
  }, [
    submittedReview,
    state.isAuthenticated,
    state.user?.username,
    reviewDispatch,
  ]);

  if (loading || genresLoading) return <div>Loading...</div>;
  if (error || genresError)
    return <div>{error ? error.message : genresError.message}</div>;
  if (!movieTvDetails || !genresData || !reviewsData)
    return <div>No data available</div>;

  const genreList = genresData.genres || [];
  const adaptedDetails = getMovieTvDetails(movieTvDetails, genreList);

  const { title, description, imageUrl, voteAverage, voteCount, genres } =
    adaptedDetails;

  const handleSubmitReview = (event) => {
    event.preventDefault();

    if (comment && userRating) {
      const review = {
        movieId: itemId,
        comment: comment,
        rating: userRating,
        username: state.user.username,
      };

      const users = JSON.parse(localStorage.getItem('users')) || [];

      const updatedUsers = users.map((user) =>
        user.username === state.user.username
          ? {
              ...user,
              reviews: [
                ...(user.reviews || []).filter(
                  (r) => r.movieId !== review.movieId
                ),
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

      setUserRating(0);
      setComment('');
      setSubmittedReview(true);
    } else {
      alert('Please enter both a comment and a rating.');
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + ' [...]';
    }
    return text;
  };

  return (
    <Container className="movie-container">
      <h1 className="title">{title}</h1>
      <div className="movie-details-container">
        <div className="image-container">
          {imageUrl && <img src={imageUrl} alt={title} className="img-fluid" />}
        </div>

        <div className="text-container">
          <p>
            <strong>Genres:</strong>{' '}
            {genres.length > 0 ? genres.join(', ') : 'No genres available'}
          </p>
          <p>
            <strong>Description: </strong> {description}
          </p>
          <p>
            <strong>Rating:</strong> {voteAverage} ({voteCount} votes)
          </p>

          {state.isAuthenticated && (
            <div className="actions-container">
              <Button className="buttons favorites-button">
                Add to Favorites
              </Button>
              <Button className="buttons">Add to Watchlist</Button>
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

          {reviewState.reviews && reviewState.reviews.length > 0 && (
            <>
              {reviewState.reviews.map((review, index) => (
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
              ))}
            </>
          )}

          {reviewsLoading && <p>Loading TMDB reviews...</p>}
          {reviewsError && <p>Error loading reviews: {reviewsError.message}</p>}

          {reviewsData && reviewsData.results.length > 0 ? (
            reviewsData.results.map((review) => (
              <div key={review.id} className="review">
                <p>
                  <strong>Author:</strong> {review.author}
                </p>
                <p>
                  <strong>Rating:</strong>{' '}
                  {review.author_details.rating || 'N/A'}
                  /10
                </p>
                <p>
                  <strong>Comment:</strong> {truncateText(review.content, 300)}
                </p>
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
