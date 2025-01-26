import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/auth/context';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  function handleMenuClick() {
    setIsDisplayed((prevIsDisplayed) => !prevIsDisplayed);
  }

  let dropdownMenuClasses = 'custom-dropdown-menu';
  if (isDisplayed) {
    dropdownMenuClasses += ' display-mobile-menu';
  }

  return (
    <header className="Header">
      <nav className="nav">
        <Container>
          <div className="menu-icon-container">
            <span
              onClick={handleMenuClick}
              className="material-icons menu-icon"
            >
              menu
            </span>
            <ul className={dropdownMenuClasses}>
              <li className={isDisplayed ? 'container' : null}>
                <Link to="/category/movie">MOVIES</Link>
              </li>
              <li className={isDisplayed ? 'container' : null}>
                <Link to="/category/tv">TV SHOWS</Link>
              </li>
              {state.isAuthenticated ? (
                <>
                  <li className={isDisplayed ? 'container' : null}>
                    <Link to="/">FAVORITES</Link>
                  </li>
                  <li className={isDisplayed ? 'container' : null}>
                    <Link to="/">WATCHLIST</Link>
                  </li>
                  <li className={isDisplayed ? 'container' : null}>
                    <Link to="/" onClick={handleLogout}>
                      LOGOUT
                    </Link>
                  </li>
                </>
              ) : (
                <li className={isDisplayed ? 'container' : null}>
                  <Link to="/register">AUTH</Link>
                </li>
              )}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
}

export default Header;
