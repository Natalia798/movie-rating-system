import React, { useContext } from 'react';
import HorizontalCarousel from '../components/HorizontalCarousel';
import './Home.css';
import { useRecentlyViewed } from '../utils/hooks/useRecentlyViewed';
import { useUserPreferredGenres } from '../utils/hooks/useUserPreferredGenres';
import { AuthContext } from '../store/auth/authContext';

function Home() {
  const { state } = useContext(AuthContext);
  const { recentMovies, recentTVShows } = useRecentlyViewed();
  const { hasMoviePreferences, hasTVPreferences } = useUserPreferredGenres();

  const isAuthenticated = state.isAuthenticated && state.user;
  const hasRecentMovies = recentMovies?.length > 0;
  const hasRecentTVShows = recentTVShows?.length > 0;
  const hasRecentActivity = hasRecentMovies || hasRecentTVShows;
  const hasSomePreferences = hasMoviePreferences || hasTVPreferences;

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
          {hasSomePreferences ? (
            <>
              {hasMoviePreferences ? (
                <HorizontalCarousel
                  title="Movies"
                  category="recommended_movies"
                />
              ) : (
                <p className="no-recommended">
                  Start adding favorite movies to get recommendations!
                </p>
              )}

              {hasTVPreferences ? (
                <HorizontalCarousel
                  title="TV Shows"
                  category="recommended_tv"
                />
              ) : (
                <p className="no-recommended">
                  Start adding favorite TV shows to get recommendations!
                </p>
              )}
            </>
          ) : (
            <p className="no-recommended">
              Start adding favorites or watchlist items to get personalized
              recommendations!
            </p>
          )}
        </CategorySection>
      )}

      {isAuthenticated && (
        <CategorySection title="Recently Viewed">
          {hasRecentActivity ? (
            <>
              {hasRecentMovies ? (
                <HorizontalCarousel title="Movies" category="viewed_movies" />
              ) : (
                <p className="no-recently-viewed">
                  You haven’t watched any movies yet.
                </p>
              )}

              {hasRecentTVShows ? (
                <HorizontalCarousel title="TV Shows" category="viewed_tv" />
              ) : (
                <p className="no-recently-viewed">
                  You haven’t watched any TV shows yet.
                </p>
              )}
            </>
          ) : (
            <p className="no-recently-viewed">
              Start watching to track your history!
            </p>
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
