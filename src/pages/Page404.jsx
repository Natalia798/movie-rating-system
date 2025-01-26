import { Link } from 'react-router-dom';
import './Page404.css';
import Container from 'react-bootstrap/Container';

function Page404() {
  return (
    <div className="Page404 bg-primary text-white d-flex flex-column justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <p className="h4 text-center">
          Sorry, the page you're trying to access does not exist (or is no
          longer available)!
        </p>
        <strong className="error404">404 :(</strong>
        <p className="h4 text-center">
          <Link to="/" className="text-secondary">
            Go back to the homepage
          </Link>
        </p>
      </Container>
    </div>
  );
}

export default Page404;
