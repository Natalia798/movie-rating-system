import React from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <Container className="container">
        <p>© Movie rating system. All rights reserved.</p>
        <p>
          Contact:{' '}
          <a href="mailto:natalia98popa@gmail.com">natalia98popa@gmail.com</a>
        </p>

        <ul className="footer-links">
          <li>
            <a
              href="https://github.com/Natalia798"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/nataliapopa98/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}

export default Footer;
