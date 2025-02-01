export function getMovieTvDetails(data, genreList) {
  if (!data) return {};

  let genreNames = (data.genres || []).map((genre) => {
    const foundGenre = genreList.find((g) => g.id === genre.id);
    return foundGenre ? foundGenre.name : 'Unknown';
  });

  let genreIds = (data.genres || []).map((genre) => genre.id);

  if (!genreIds.length && data.genre_ids) {
    genreIds = data.genre_ids;
  }

  genreNames = genreNames.filter((genre) => genre !== null);
  genreIds = genreIds.filter((id) => id !== null && id !== undefined);

  return {
    id: data.id,
    title: data.title || data.name || 'No title available',
    description: data.overview || 'No description available',
    imageUrl: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : null,
    voteAverage: data.vote_average || 'No rating available',
    voteCount: data.vote_count || 'No votes available',
    genres: genreNames.length > 0 ? genreNames : ['No genres available'],
    genre_ids: genreIds.length > 0 ? genreIds : [],
    mediaType: data.media_type || (data.name ? 'tv' : 'movie'),
  };
}
