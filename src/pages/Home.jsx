import React, { useContext } from 'react';
import HorizontalCarousel from '../components/HorizontalCarousel';
import './Home.css';
import { useRecentlyViewed } from '../utils/hooks/useRecentlyViewed';
import { useUserPreferredGenres } from '../utils/hooks/useUserPreferredGenres';
import { AuthContext } from '../store/auth/authContext';

function Home() {
  const { state } = useContext(AuthContext);
  const { recentMovies, recentTVShows } = useRecentlyViewed();
  const { hasPreferences } = useUserPreferredGenres();

  const isAuthenticated = state.isAuthenticated && state.user;
  const hasRecentMovies = recentMovies?.length > 0;
  const hasRecentTVShows = recentTVShows?.length > 0;

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

      {isAuthenticated && hasPreferences ? (
        <CategorySection title="Recommended for You">
          <HorizontalCarousel title="Movies" category="recommended_movies" />
          <HorizontalCarousel title="TV Shows" category="recommended_tv" />
        </CategorySection>
      ) : isAuthenticated ? (
        <p className="no-recommended">
          Start adding favorites or watchlist items to get personalized
          recommendations!
        </p>
      ) : null}

      {isAuthenticated && (hasRecentMovies || hasRecentTVShows) && (
        <CategorySection title="Recently Viewed">
          {hasRecentMovies && (
            <HorizontalCarousel title="Movies" category="viewed_movies" />
          )}
          {hasRecentTVShows && (
            <HorizontalCarousel title="TV Shows" category="viewed_tv" />
          )}
          {!hasRecentMovies && (
            <p className="no-recently-viewed">No recently viewed movies.</p>
          )}
          {!hasRecentTVShows && (
            <p className="no-recently-viewed">No recently viewed TV shows.</p>
          )}
        </CategorySection>
      )}
    </section>
  );
}

const CategorySection = ({ title, children }) => (
  <div className="sections">
    <h2 className="mb-3 pt-3">{title}</h2>
    <div className="carousel-wrapper">{children}</div>
  </div>
);

export default Home;
