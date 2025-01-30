import { Card, Button } from 'react-bootstrap';
import './MovieTvCardList.css';
import { Link } from 'react-router-dom';

function MovieTvCardList({ movieTvList, onRemove }) {
  return (
    <div className="row">
      {movieTvList.map((item) => {
        const category = item.mediaType;

        return (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <Card className="movie-card">
              <Link
                to={`/category/${category}/${item.id}`}
                className="movie-link"
                state={{ category }}
                onClick={(e) => e.stopPropagation()}
              >
                {item.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    alt={item.title}
                    className="movie-card-img"
                  />
                )}
              </Link>

              <Card.Body className="movie-card-body">
                <Link
                  to={`/category/${category}/${item.id}`}
                  className="movie-link"
                  state={{ category }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Card.Title className="movie-card-title">
                    {item.title}
                  </Card.Title>
                </Link>

                <Card.Text className="movie-card-text">
                  <strong>Rating:</strong> {item.voteAverage} / 10
                </Card.Text>

                <div className="details-container">
                  <Link
                    to={`/category/${category}/${item.id}`}
                    state={{ category }}
                  >
                    <Button className="details-button">Details</Button>
                  </Link>

                  {onRemove && (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove(item.id);
                      }}
                      className="remove-button"
                    >
                      &#10006;
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default MovieTvCardList;
