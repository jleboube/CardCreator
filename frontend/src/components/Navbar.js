import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚾</span>
          Baseball Card Creator
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/creator" className="nav-link">
                Create Card
              </Link>
              <Link to="/dashboard" className="nav-link">
                My Cards
              </Link>
              <div className="user-menu">
                <span className="user-name">{user?.name}</span>
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="user-avatar"
                  />
                )}
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/" className="nav-link">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
