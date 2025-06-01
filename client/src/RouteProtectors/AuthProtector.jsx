import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthProtector = ({ children }) => {
  const userType = localStorage.getItem('userType');

  if (!userType) {
    // User not logged in, redirect to login page (or homepage)
    return <Navigate to='/' replace />;
  }

  // User is authenticated, render children
  return children;
};

export default AuthProtector;
