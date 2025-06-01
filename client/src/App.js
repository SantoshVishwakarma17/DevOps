import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Authenticate from './pages/Authenticate';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
import AllUsers from './pages/AllUsers';
import AllBookings from './pages/AllBookings';
import AllFlights from './pages/AllFlights';
import NewFlight from './pages/NewFlight';
import EditFlight from './pages/EditFlight';
import BookFlight from './pages/BookFlight';
import FlightAdmin from './pages/FlightAdmin';
import FlightBookings from './pages/FlightBookings';
import Flights from './pages/Flights';

import LoginProtector from './RouteProtectors/LoginProtector';
import AuthProtector from './RouteProtectors/AuthProtector';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedin(!!token);
  }, []);

  return (
    <div className="App">
      <Navbar isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginProtector><Authenticate setIsLoggedin={setIsLoggedin} /></LoginProtector>} />

        {/* Customer Routes */}
        <Route path="/book-flight/:id" element={<AuthProtector allowedRoles={['customer']}><BookFlight /></AuthProtector>} />
        <Route path="/my-bookings" element={<AuthProtector allowedRoles={['customer']}><Bookings /></AuthProtector>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AuthProtector allowedRoles={['admin']}><Admin /></AuthProtector>} />
        <Route path="/all-users" element={<AuthProtector allowedRoles={['admin']}><AllUsers /></AuthProtector>} />
        <Route path="/all-bookings" element={<AuthProtector allowedRoles={['admin']}><AllBookings /></AuthProtector>} />
        <Route path="/all-flights" element={<AuthProtector allowedRoles={['admin']}><AllFlights /></AuthProtector>} />

        {/* Flight Operator Routes */}
        <Route path="/flight-admin" element={<AuthProtector allowedRoles={['flight-operator']}><FlightAdmin /></AuthProtector>} />
        <Route path="/flight-bookings" element={<AuthProtector allowedRoles={['flight-operator']}><FlightBookings /></AuthProtector>} />
        <Route path="/flights" element={<AuthProtector allowedRoles={['flight-operator']}><Flights /></AuthProtector>} />
        <Route path="/new-flight" element={<AuthProtector allowedRoles={['flight-operator']}><NewFlight /></AuthProtector>} />
        <Route path="/edit-flight/:id" element={<AuthProtector allowedRoles={['flight-operator']}><EditFlight /></AuthProtector>} />
      </Routes>
    </div>
  );
}

export default App;
