const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'ADD_REVIEW':
      const review = action.payload;

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

      return state;

    case 'SET_USER_REVIEWS':
      return {
        ...state,
        user: {
          ...state.user,
          reviews: action.payload,
        },
      };

    default:
      return state;
  }
};

export { authReducer, initialState };
