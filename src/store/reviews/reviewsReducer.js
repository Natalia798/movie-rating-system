const initialState = { user: null, reviews: [] };

const reviewsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REVIEW': {
      const review = action.payload;
      const users = JSON.parse(localStorage.getItem('users')) || [];

      const updatedUsers = users.map((user) =>
        state.user && user.username === state.user.username
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

      return {
        ...state,
        reviews: [
          ...state.reviews.filter((r) => r.movieId !== review.movieId),
          review,
        ],
      };
    }

    case 'SET_USER_REVIEWS': {
      return {
        ...state,
        user: {
          ...state.user,
          reviews: action.payload,
        },
        reviews: action.payload,
      };
    }

    default:
      return state;
  }
};

export { reviewsReducer, initialState };
