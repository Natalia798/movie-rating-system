export function getMovieTvDetails(data, genreList) {
  if (!data) return {};

  const genreNames = (data.genres || []).map((genre) => {
    const foundGenre = genreList.find((g) => g.id === genre.id);
    return foundGenre ? foundGenre.name : 'Unknown';
  });

  return {
    id: data.id,
    title: data.title || data.name || 'No title available',
    description: data.overview || 'No description available',
    imageUrl: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : null,
    voteAverage: data.vote_average || 'No rating available',
    voteCount: data.vote_count || 'No votes available',
    genres: genreNames || ['No genres available'],
  };
}
