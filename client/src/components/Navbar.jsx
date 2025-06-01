// src/components/Navbar.jsx

import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, usertype } = useContext(GeneralContext);

  // If user is not logged in, usertype === ''
  // Clicking Login just calls logout(), which clears state and sends to /auth
  const handleLoginClick = () => {
    logout(); // this will clear localStorage + context state + navigate to '/auth'
  };

  return (
    <div className="navbar">
      {!usertype ? (
        <>
          <div className="navbar-header">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <h3>Airline Management System</h3>
          </div>
          <div className="nav-options">
            <p onClick={() => navigate('/')}>Home</p>
            <button onClick={handleLoginClick}>Login</button>
          </div>
        </>
      ) : (
        <>
          {/* Customer menu */}
          {usertype === 'customer' && (
            <>
              <div className="navbar-header">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <h3>SKY Furaito</h3>
              </div>
              <div className="nav-options">
                <p onClick={() => navigate('/')}>Home</p>
                <p onClick={() => navigate('/bookings')}>Bookings</p>
                <p onClick={logout}>Logout</p>
              </div>
            </>
          )}

          {/* Admin menu */}
          {usertype === 'admin' && (
            <>
              <div className="navbar-header">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <h3>SKY Furaito (Admin)</h3>
              </div>
              <div className="nav-options">
                <p onClick={() => navigate('/admin')}>Home</p>
                <p onClick={() => navigate('/all-users')}>Users</p>
                <p onClick={() => navigate('/all-bookings')}>Bookings</p>
                <p onClick={() => navigate('/all-flights')}>Flights</p>
                <p onClick={logout}>Logout</p>
              </div>
            </>
          )}

          {/* Flight‐operator menu */}
          {usertype === 'flight-operator' && (
            <>
              <div className="navbar-header">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <h3>SKY Furaito (Operator)</h3>
              </div>
              <div className="nav-options">
                <p onClick={() => navigate('/flight-admin')}>Home</p>
                <p onClick={() => navigate('/flight-bookings')}>Bookings</p>
                <p onClick={() => navigate('/flights')}>Flights</p>
                <p onClick={() => navigate('/new-flight')}>Add Flight</p>
                <p onClick={logout}>Logout</p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
