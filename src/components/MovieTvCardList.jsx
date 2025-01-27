import { Card, Button } from 'react-bootstrap';
import './MovieTvCardList.css';
import { Link } from 'react-router-dom';

function MovieTvCardList({ movieTvList, categoryId }) {
  return (
    <div className="row">
      {movieTvList.map((item) => (
        <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to={`/category/${categoryId}/${item.id}`}>
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
                <Card.Title className="movie-card-title">
                  {item.title}
                </Card.Title>
                <Card.Text className="movie-card-text">
                  <strong>Rating:</strong> {item.voteAverage} / 10
                </Card.Text>

                <Button className="details-button">Details</Button>
              </Card.Body>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MovieTvCardList;
