import React from 'react';
import HorizontalCarousel from '../components/HorizontalCarousel';
import './Home.css';

function Home() {
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
