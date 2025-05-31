import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const usertype = localStorage.getItem('userType');
  const { logout } = useContext(GeneralContext);

  return (
    <div className="navbar">
      <div className="navbar-header">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h3>
          {usertype === 'admin'
            ? 'SKY Furaito (Admin)'
            : usertype === 'flight-operator'
            ? 'SKY Furaito (Operator)'
            : usertype === 'customer'
            ? 'SKY Furaito'
            : 'Airline Management System'}
        </h3>
      </div>

      <div className="nav-options">
        {!usertype && (
          <>
            <p onClick={() => navigate('/')}>Home</p>
            <p onClick={() => navigate('/auth')}>Login</p>
          </>
        )}

        {usertype === 'customer' && (
          <>
            <p onClick={() => navigate('/')}>Home</p>
            <p onClick={() => navigate('/bookings')}>Bookings</p>
            <p onClick={logout}>Logout</p>
          </>
        )}

        {usertype === 'admin' && (
          <>
            <p onClick={() => navigate('/admin')}>Home</p>
            <p onClick={() => navigate('/all-users')}>Users</p>
            <p onClick={() => navigate('/all-bookings')}>Bookings</p>
            <p onClick={() => navigate('/all-flights')}>Flights</p>
            <p onClick={logout}>Logout</p>
          </>
        )}

        {usertype === 'flight-operator' && (
          <>
            <p onClick={() => navigate('/flight-admin')}>Home</p>
            <p onClick={() => navigate('/flight-bookings')}>Bookings</p>
            <p onClick={() => navigate('/flights')}>Flights</p>
            <p onClick={() => navigate('/new-flight')}>Add Flight</p>
            <p onClick={logout}>Logout</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
