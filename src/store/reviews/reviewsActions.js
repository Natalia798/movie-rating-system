export const addReview = (review) => ({
  type: 'ADD_REVIEW',
  payload: review,
});

export const setUserReviews = (reviews) => ({
  type: 'SET_USER_REVIEWS',
  payload: reviews,
});
