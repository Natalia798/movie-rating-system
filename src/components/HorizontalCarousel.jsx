import React, { useRef, useState, useEffect } from 'react';
import { useFetch } from '../utils/hooks/useFetch';
import {
  getTrendingMovies,
  getTrendingTVShows,
  getTopRatedMovies,
  getTopRatedTVShows,
} from '../api/endpoints';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './HorizontalCarousel.css';

const categoryEndpoints = {
  trending_movies: getTrendingMovies,
  trending_tv: getTrendingTVShows,
  top_movies: getTopRatedMovies,
  top_tv: getTopRatedTVShows,
};

function HorizontalCarousel({ title, category }) {
  const endpointFunction = categoryEndpoints[category];
  const url = endpointFunction ? endpointFunction() : null;
  const { data, loading, error } = useFetch(url);

  const [items, setItems] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (data?.results) {
      setItems(data.results);
    }
  }, [data]);

  const categoryType = category.includes('movie') ? 'movie' : 'tv';

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  if (!url) return null;
  if (loading) return <p>Loading {title}...</p>;
  if (error)
    return (
      <p>
        Error loading {title}: {error.message}
      </p>
    );
  if (items.length === 0) return <p>No data available</p>;

  return (
    <div className="carousel-container">
      <h3>{title}</h3>
      <div className="carousel">
        <button className="carousel-btn left" onClick={scrollLeft}>
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
                {item.poster_path ? (
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    className="item-card-img"
                  />
                ) : (
                  <p>No image available</p>
                )}

                <Card.Body className="item-card-body">
                  <Card.Title className="item-card-title">
                    {item.title || item.name}
                  </Card.Title>
                  <Card.Text className="item-card-text">
                    <strong>Rating:</strong> {item.vote_average} / 10
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
        <button className="carousel-btn right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default HorizontalCarousel;
