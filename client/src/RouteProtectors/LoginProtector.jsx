import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginProtector = ({ children }) => {
  const userType = localStorage.getItem('userType');

  if (userType) {
    // Redirect logged-in users away from /auth
    if (userType === 'customer') {
      return <Navigate to='/' replace />; // Customer home
    } else if (userType === 'admin') {
      return <Navigate to='/admin' replace />; // Admin dashboard
    } else if (userType === 'flight-operator') {
      return <Navigate to='/flight-admin' replace />; // Flight operator dashboard
    } else {
      // Default fallback for unknown user types
      return <Navigate to='/' replace />;
    }
  }

  // If not logged in, allow access to login page
  return children;
};

export default LoginProtector;
