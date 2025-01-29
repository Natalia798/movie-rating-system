import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useReducer, useEffect } from 'react';
import { AuthContext } from './store/auth/authContext';
import { ReviewsContext } from './store/reviews/reviewsContext';
import { FavoritesWatchlistContext } from './store/favorites/favoritesContext';

import { authReducer, initialState } from './store/auth/authReducer';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import Register from './pages/Register';
import Layout from './components/Layout';
import Login from './pages/Login';
import PreferencesPage from './pages/PreferencesPage';
import MovieTvCategory from './pages/MovieTvCategory';
import MovieTvDetails from './pages/MovieDetails';
import { reviewsReducer } from './store/reviews/reviewsReducer';
import { favoritesWatchlistReducer } from './store/favorites/favoritesReducer';

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [reviewState, reviewDispatch] = useReducer(reviewsReducer, {
    ...initialState,
    reviews: [],
  });
  const [favoritesWatchlistState, favoritesWatchlistDispatch] = useReducer(
    favoritesWatchlistReducer
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({
        type: 'LOGIN',
        payload: user,
      });
    }
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <ReviewsContext.Provider value={{ reviewState, reviewDispatch }}>
        <FavoritesWatchlistContext.Provider
          value={{ favoritesWatchlistState, favoritesWatchlistDispatch }}
        >
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Page404 />} />
                <Route
                  path="/category/:categoryId"
                  element={<MovieTvCategory />}
                />
                <Route
                  path="/category/:category/:itemId"
                  element={<MovieTvDetails />}
                />
                <Route
                  path="/preferences/:type"
                  element={<PreferencesPage />}
                />
              </Routes>
            </Layout>
          </Router>
        </FavoritesWatchlistContext.Provider>
      </ReviewsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
