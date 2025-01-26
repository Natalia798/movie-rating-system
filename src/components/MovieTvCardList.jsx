import { Card, Button } from 'react-bootstrap';
import './MovieTvCardList.css';

function MovieTvCardList({ movieTvList, genreList }) {
  // const getGenreNames = (genreIds) => {
  //   return genreIds
  //     .map((id) => {
  //       const genre = genreList.find((genre) => genre.id === id);
  //       return genre ? genre.name : 'Unknown';
  //     })
  //     .join(', ');
  // };

  return (
    <div className="row">
      {movieTvList.map((item) => (
        <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Card className="movie-card">
            {item.imageUrl && (
              <Card.Img
                variant="top"
                src={item.imageUrl}
                alt={item.title}
                className="movie-card-img"
              />
            )}
            <Card.Body className="movie-card-body">
              <Card.Title className="movie-card-title">{item.title}</Card.Title>
              <Card.Text className="movie-card-text">
                <strong>Rating:</strong> {item.voteAverage.toFixed(2)} / 10
              </Card.Text>
              {/* <Card.Text className="movie-card-text">
                <strong>Genres:</strong> {getGenreNames(item.genres)}
              </Card.Text> */}
              <div className="movie-card-buttons">
                <Button>Add to Favorites</Button>
                <Button>Add to Watchlist</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default MovieTvCardList;
