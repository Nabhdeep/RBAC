import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">BlogApp</Link>
        
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="navbar-link">Admin Dashboard</Link>
              )}
              <span className="navbar-user">Hello, {user.name}</span>
              <button 
                onClick={logout} 
                className="btn btn-danger"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;