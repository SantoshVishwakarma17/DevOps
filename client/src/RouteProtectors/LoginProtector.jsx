import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginProtector = ({ children }) => {
  const userType = localStorage.getItem('userType');

  if (userType) {
    if (userType === 'customer') {
      return <Navigate to='/' replace />;
    } else if (userType === 'admin') {
      return <Navigate to='/admin' replace />;
    }
  }

  // If no userType, show login or public content
  return children;
};

export default LoginProtector;
