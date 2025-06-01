import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginProtector = ({ children }) => {
  const userType = localStorage.getItem('userType');

  if (userType === 'customer') {
    return <Navigate to='/' replace />;
  }
  if (userType === 'admin') {
    return <Navigate to='/admin' replace />;
  }

  // no userType found, so user not logged in — allow login page to render
  return children;
};

export default LoginProtector;
