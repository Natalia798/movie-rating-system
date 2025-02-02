import { useState, useContext, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/auth/authContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDisplayed, setIsDisplayed] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });

    navigate('/');
    window.location.reload();
  };

  function handleMenuClick() {
    setIsDisplayed((prevIsDisplayed) => !prevIsDisplayed);
  }

  function closeMenu() {
    setIsDisplayed(false);
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }

    if (isDisplayed) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDisplayed]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let dropdownMenuClasses = 'custom-dropdown-menu';
  if (isDisplayed) {
    dropdownMenuClasses += ' display-mobile-menu';
  }

  return (
    <header className="Header">
      <nav className="nav">
        <Container>
          <div className="menu-icon-container" ref={menuRef}>
            <span
              onClick={handleMenuClick}
              className="material-icons menu-icon"
            >
              menu
            </span>
            <ul className={dropdownMenuClasses}>
              <li onClick={closeMenu}>
                <Link to="/">HOME</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/category/movie">MOVIES</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/category/tv">TV SHOWS</Link>
              </li>
              {state.isAuthenticated ? (
                <>
                  <li onClick={closeMenu}>
                    <Link to="/preferences/favorites">FAVORITES</Link>
                  </li>
                  <li onClick={closeMenu}>
                    <Link to="/preferences/watchlist">WATCHLIST</Link>
                  </li>
                  <li onClick={closeMenu}>
                    <Link to="/" onClick={handleLogout}>
                      LOGOUT
                    </Link>
                  </li>
                </>
              ) : (
                <li onClick={closeMenu}>
                  <Link to="/login">AUTH</Link>
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
