import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useReducer } from 'react';
import { AuthContext } from './store/auth/authContext';
import { ReviewsContext } from './store/reviews/reviewsContext';
import { authReducer, initialState } from './store/auth/authReducer';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import Register from './pages/Register';
import Layout from './components/Layout';
import Login from './pages/Login';
import MovieTvCategory from './pages/MovieTvCategory';
import MovieTvDetails from './pages/MovieDetails';
import { reviewsReducer } from './store/reviews/reviewsReducer';

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [reviewState, reviewDispatch] = useReducer(reviewsReducer, {
    ...initialState,
    reviews: [],
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <ReviewsContext.Provider value={{ reviewState, reviewDispatch }}>
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
            </Routes>
          </Layout>
        </Router>
      </ReviewsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
