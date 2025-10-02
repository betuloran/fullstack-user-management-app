import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/useAuth';

const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  // If user is not authenticated, show minimal navbar
  if (!isAuthenticated) {
    return (
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/login" className="nav-brand">
            UserHub
          </Link>

          <div className="nav-actions">
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

  // If user is authenticated, show full navbar
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