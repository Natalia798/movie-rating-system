const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],
};

const favoritesWatchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      const updatedUsersFavorites = state.users.map((user) => {
        if (user.username === action.payload.username) {
          const updatedFavorites = [...user.favorites, action.payload.movie];
          localStorage.setItem('users', JSON.stringify(state.users));
          return {
            ...user,
            favorites: updatedFavorites,
          };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsersFavorites,
      };

    case 'REMOVE_FROM_FAVORITES':
      const removedUsersFavorites = state.users.map((user) => {
        if (user.username === action.payload.username) {
          const removedFavorites = user.favorites.filter(
            (movie) => movie.id !== action.payload.movie.id
          );
          localStorage.setItem('users', JSON.stringify(state.users));
          return {
            ...user,
            favorites: removedFavorites,
          };
        }
        return user;
      });
      return {
        ...state,
        users: removedUsersFavorites,
      };

    case 'ADD_TO_WATCHLIST':
      const updatedUsersWatchlist = state.users.map((user) => {
        if (user.username === action.payload.username) {
          const updatedWatchlist = [...user.watchlist, action.payload.movie];
          localStorage.setItem('users', JSON.stringify(state.users));
          return {
            ...user,
            watchlist: updatedWatchlist,
          };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsersWatchlist,
      };

    case 'REMOVE_FROM_WATCHLIST':
      const removedUsersWatchlist = state.users.map((user) => {
        if (user.username === action.payload.username) {
          const removedWatchlist = user.watchlist.filter(
            (movie) => movie.id !== action.payload.movie.id
          );
          localStorage.setItem('users', JSON.stringify(state.users));
          return {
            ...user,
            watchlist: removedWatchlist,
          };
        }
        return user;
      });
      return {
        ...state,
        users: removedUsersWatchlist,
      };

    default:
      return state;
  }
};

export { initialState, favoritesWatchlistReducer };
