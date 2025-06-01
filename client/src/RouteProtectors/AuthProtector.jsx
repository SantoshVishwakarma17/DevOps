import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthProtector = ({ children }) => {
  const userType = localStorage.getItem('userType');
  const location = useLocation();

  if (!userType) {
    // Redirect to login page, pass current location in state
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // User is authenticated, render protected children
  return children;
};

export default AuthProtector;
