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

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function getMovieTvCategory(data) {
  return data.map((item) => ({
    id: item.id,
    title: item.title || item.name,
    description: item.overview || 'No description available',
    imageUrl: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : null,
    genres: item.genre_ids,
    voteAverage: item.vote_average,
    voteCount: item.vote_count,
  }));
}

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
    ? getMovieTvCategory(moviesTvShows.results)
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
    <Container className="my-5">
      <h1 className="mb-5 pt-3">{title}</h1>
      <MovieTvCardList
        movieTvList={adaptedMovieTvList}
        genreList={genresData?.genres || []}
      />
      <Pagination active={currentPage} baseUrl={`/category/${categoryId}`} />
    </Container>
  );
}

export default MovieTvCategory;
