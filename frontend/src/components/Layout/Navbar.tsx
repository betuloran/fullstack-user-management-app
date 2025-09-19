import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
};

export default Navbar;
