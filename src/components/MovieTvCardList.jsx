import { Card, Button } from 'react-bootstrap';
import './MovieTvCardList.css';
import { Link } from 'react-router-dom';
import noImage from '../assets/noImage.png';

function MovieTvCardList({ movieTvList, onRemove }) {
  return (
    <div className="flex-container">
      {movieTvList.map((item) => {
        const category = item.mediaType;

        return (
          <div key={item.id} className="flex-item">
            <Card className="item-card">
              <Link
                to={`/category/${category}/${item.id}`}
                state={{ category }}
                onClick={(e) => e.stopPropagation()}
              >
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
              </Link>

              <Card.Body className="item-card-body">
                <Link
                  to={`/category/${category}/${item.id}`}
                  state={{ category }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Card.Title className="item-card-title">
                    {item.title}
                  </Card.Title>

                  <Card.Text className="item-card-text">
                    <strong>Rating:</strong> {item.voteAverage} / 10
                  </Card.Text>
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
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default MovieTvCardList;
