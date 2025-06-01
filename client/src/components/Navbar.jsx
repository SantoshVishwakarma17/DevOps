import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedin, setIsLoggedin }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type);
  }, [isLoggedin]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    setIsLoggedin(false); // Notify app that user logged out
    navigate('/auth');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Flight Tickets
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {!isLoggedin && (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  Login
                </Link>
              </li>
            )}

            {isLoggedin && userType === 'customer' && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-bookings">
                  My Bookings
                </Link>
              </li>
            )}

            {isLoggedin && userType === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/all-users">
                    All Users
                  </Link>
                </li>
              </>
            )}

            {isLoggedin && userType === 'flight-operator' && (
              <li className="nav-item">
                <Link className="nav-link" to="/flight-admin">
                  Operator Panel
                </Link>
              </li>
            )}

            {isLoggedin && (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
