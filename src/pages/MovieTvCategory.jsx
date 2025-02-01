import React from 'react';
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

function MovieTvCategory() {
  const { categoryId } = useParams();
  const [queryParams] = useSearchParams();
  const currentPage = queryParams.get('page') || 1;

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

  let title = '';
  switch (categoryId) {
    case 'movie':
      title = 'Movies';
      break;
    case 'tv':
      title = 'TV Shows';
      break;
    default:
      title = 'Popular';
      break;
  }

  if (loadingMovies || loadingGenres) return <div>Loading...</div>;
  if (errorMovies || errorGenres) return <div>Error loading data</div>;

  return (
    <Container>
      <h2 className="mb-3 pt-3">{title}</h2>
      <MovieTvCardList
        movieTvList={adaptedMovieTvList}
        genreList={genresData?.genres || []}
        categoryId={categoryId}
      />
      <Pagination active={currentPage} baseUrl={`/category/${categoryId}`} />
    </Container>
  );
}

export default MovieTvCategory;
