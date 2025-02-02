import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useFetch } from '../utils/hooks/useFetch';
import {
  getItemsByCategoryEndpoint,
  getGenresEndpoint,
} from '../api/endpoints';
import MovieTvCardList from '../components/MovieTvCardList';
import Pagination from '../components/Pagination';
import { getMovieTvDetails } from '../api/adaptors';
import './MovieTvCategory.css';

function MovieTvCategory() {
  const { categoryId } = useParams();
  const [queryParams] = useSearchParams();
  const currentPage = queryParams.get('page') || 1;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortByRating, setSortByRating] = useState('');

  const movieTvCategoryEndpoint = getItemsByCategoryEndpoint(
    categoryId,
    currentPage
  );

  const {
    data: moviesTvShows,
    loading: loadingMovies,
    error: errorMovies,
  } = useFetch(movieTvCategoryEndpoint);

  const genreEndpoint = getGenresEndpoint(categoryId);
  const {
    data: genresData,
    loading: loadingGenres,
    error: errorGenres,
  } = useFetch(genreEndpoint);

  const adaptedMovieTvList = moviesTvShows?.results
    ? moviesTvShows.results.map((item) =>
        getMovieTvDetails(item, genresData?.genres || [])
      )
    : [];

  const filteredAndSortedMovies = adaptedMovieTvList
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedGenre
        ? Array.isArray(item.genre_ids) &&
          item.genre_ids.includes(parseInt(selectedGenre))
        : true
    )
    .sort((a, b) => {
      if (sortByRating === 'desc') return b.voteAverage - a.voteAverage;
      if (sortByRating === 'asc') return a.voteAverage - b.voteAverage;
      return 0;
    });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSortByRating('');
  };

  let title = categoryId === 'movie' ? 'Movies' : 'TV Shows';

  if (loadingMovies || loadingGenres) return <div>Loading...</div>;
  if (errorMovies || errorGenres) return <div>Error loading data</div>;

  return (
    <Container>
      <h2 className="category-title">{title}</h2>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Genres</option>
          {genresData?.genres?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <label className="sort-label">
          Sort by Rating:
          <select
            value={sortByRating}
            onChange={(e) => setSortByRating(e.target.value)}
            className="sort-dropdown"
          >
            <option value="">None</option>
            <option value="desc">Highest First</option>
            <option value="asc">Lowest First</option>
          </select>
        </label>

        <button className="reset-button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>

      {filteredAndSortedMovies.length === 0 ? (
        <p className="no-results-message">
          No results found. Try a different search or filter.
        </p>
      ) : (
        <MovieTvCardList
          movieTvList={filteredAndSortedMovies}
          genreList={genresData?.genres || []}
          categoryId={categoryId}
        />
      )}

      {!searchTerm && !selectedGenre && filteredAndSortedMovies.length > 0 && (
        <Pagination active={currentPage} baseUrl={`/category/${categoryId}`} />
      )}
    </Container>
  );
}

export default MovieTvCategory;
