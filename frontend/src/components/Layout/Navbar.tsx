import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiLogIn, FiUserPlus, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../../contexts/useAuth';
import { useTheme } from '../../contexts/useTheme';

const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return (
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/login" className="nav-brand">
            UserHub
          </Link>

          <div className="nav-actions">
            <button
              onClick={toggleTheme}
              className="btn btn-secondary btn-sm theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
            </button>
            <Link to="/login" className="btn btn-secondary btn-sm">
              <FiLogIn size={16} />
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              <FiUserPlus size={16} />
              Register
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          UserHub
        </Link>

        <ul className="nav-links">
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <FiHome size={18} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`nav-link ${isActive('/users') ? 'active' : ''}`}
            >
              <FiUsers size={18} />
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className={`nav-link ${isActive('/posts') ? 'active' : ''}`}
            >
              <FiFileText size={18} />
              Posts
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            type="button"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="1em"
              height="1em"
              fill="currentColor"
              className="theme-toggle__inner-moon"
              viewBox="0 0 32 32"
            >
              <path d="M27.5 11.5v-7h-7L16 0l-4.5 4.5h-7v7L0 16l4.5 4.5v7h7L16 32l4.5-4.5h7v-7L32 16l-4.5-4.5zM16 25.4a9.39 9.39 0 1 1 0-18.8 9.39 9.39 0 1 1 0 18.8z" />
              <circle cx="16" cy="16" r="8.1" />
            </svg>
          </button>
          <div className="user-info">
            <span className="user-name">Welcome, {user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-sm logout-btn"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;