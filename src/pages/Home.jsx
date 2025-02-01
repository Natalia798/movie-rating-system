import React from 'react';
import HorizontalCarousel from '../components/HorizontalCarousel';
import './Home.css';
import { useRecentlyViewed } from '../utils/hooks/useRecentlyViewed';
import { AuthContext } from '../store/auth/authContext';
import { useContext } from 'react';

function Home() {
  const { state } = useContext(AuthContext);
  const { recentMovies, recentTVShows } = useRecentlyViewed();

  const isAuthenticated = state.isAuthenticated && state.user;
  const hasRecentMovies = (recentMovies?.length || 0) > 0;
  const hasRecentTVShows = (recentTVShows?.length || 0) > 0;

  return (
    <section className="home-container">
      <CategorySection title="Trending Now">
        <HorizontalCarousel title="Movies" category="trending_movies" />
        <HorizontalCarousel title="TV Shows" category="trending_tv" />
      </CategorySection>

      <CategorySection title="Top Rated">
        <HorizontalCarousel title="Movies" category="top_movies" />
        <HorizontalCarousel title="TV Shows" category="top_tv" />
      </CategorySection>

      {isAuthenticated && (
        <CategorySection title="Recommended for You">
          <HorizontalCarousel title="Movies" category="recommended_movies" />
          <HorizontalCarousel title="TV Shows" category="recommended_tv" />
        </CategorySection>
      )}

      {isAuthenticated && (hasRecentMovies || hasRecentTVShows) && (
        <CategorySection title="Recently Viewed">
          {hasRecentMovies ? (
            <HorizontalCarousel title="Movies" category="viewed_movies" />
          ) : (
            <p className="no-recently-viewed">No recently viewed movies.</p>
          )}

          {hasRecentTVShows ? (
            <HorizontalCarousel title="TV Shows" category="viewed_tv" />
          ) : (
            <p className="no-recently-viewed">No recently viewed TV shows.</p>
          )}
        </CategorySection>
      )}

      {isAuthenticated && !hasRecentMovies && !hasRecentTVShows && (
        <p className="no-recently-viewed">
          You haven't viewed any movies or TV shows recently.
        </p>
      )}
    </section>
  );
}

const CategorySection = ({ title, children, className }) => (
  <div className={`sections ${className}`}>
    <h2>{title}</h2>
    <div className="carousel-wrapper">{children}</div>
  </div>
);

export default Home;
