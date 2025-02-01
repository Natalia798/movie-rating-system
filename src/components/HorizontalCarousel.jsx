import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFetch } from '../utils/hooks/useFetch';
import {
  getTrendingMovies,
  getTrendingTVShows,
  getTopRatedMovies,
  getTopRatedTVShows,
  getMoviesByGenres,
  getTVShowsByGenres,
} from '../api/endpoints';
import { useUserPreferredGenres } from '../utils/hooks/useUserPreferredGenres';
import { useRecentlyViewed } from '../utils/hooks/useRecentlyViewed';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './HorizontalCarousel.css';
import noImage from '../assets/noImage.png';

const categoryEndpoints = {
  trending_movies: getTrendingMovies,
  trending_tv: getTrendingTVShows,
  top_movies: getTopRatedMovies,
  top_tv: getTopRatedTVShows,
};

function HorizontalCarousel({ title, category }) {
  const [items, setItems] = useState([]);
  const carouselRef = useRef(null);
  const { movieGenres, tvGenres } = useUserPreferredGenres();
  const { recentMovies, recentTVShows } = useRecentlyViewed();

  const endpointFunction = useMemo(() => {
    if (category === 'recommended_movies') {
      return () => getMoviesByGenres(movieGenres);
    } else if (category === 'recommended_tv') {
      return () => getTVShowsByGenres(tvGenres);
    }
    return categoryEndpoints[category] ? categoryEndpoints[category] : null;
  }, [category, movieGenres, tvGenres]);

  const url = endpointFunction ? endpointFunction() : null;
  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (category === 'viewed_movies') {
      if (recentMovies === null) {
        return;
      }
      setItems([...recentMovies]);
      return;
    }
    if (category === 'viewed_tv') {
      if (recentTVShows === null) {
        return;
      }
      setItems([...recentTVShows]);
      return;
    }
    if (data?.results) {
      setItems([...data.results]);
    }
  }, [category, data, recentMovies, recentTVShows]);

  const categoryType = category.includes('movie') ? 'movie' : 'tv';

  if (category.includes('viewed') && items.length === 0)
    return <p>No data available</p>;
  if (!category.includes('viewed') && loading) return <p>Loading {title}...</p>;
  if (error)
    return (
      <p>
        Error loading {title}: {error.message}
      </p>
    );

  return (
    <div className="carousel-container">
      <h3>{title}</h3>
      <div className="carousel">
        <button
          className="carousel-btn left"
          onClick={() =>
            carouselRef.current.scrollBy({ left: -500, behavior: 'smooth' })
          }
        >
          <FaChevronLeft />
        </button>
        <div className="carousel-items" ref={carouselRef}>
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/category/${categoryType}/${item.id}`}
              state={{ category: categoryType }}
              className="carousel-item-link"
            >
              <Card className="item-card">
                <Card.Img
                  variant="top"
                  src={
                    item.imageUrl ||
                    (item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : noImage)
                  }
                  alt={item.title || item.name}
                  className="item-card-img"
                />

                <Card.Body className="item-card-body">
                  <Card.Title className="item-card-title">
                    {item.title || item.name}
                  </Card.Title>
                  <Card.Text className="item-card-text">
                    <strong>Rating:</strong>{' '}
                    {item.voteAverage || item.vote_average} / 10
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
        <button
          className="carousel-btn right"
          onClick={() =>
            carouselRef.current.scrollBy({ left: 500, behavior: 'smooth' })
          }
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default HorizontalCarousel;
