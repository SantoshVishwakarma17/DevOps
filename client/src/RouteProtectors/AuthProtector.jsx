// src/RouteProtectors/AuthProtector.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const AuthProtector = ({ children }) => {
  const { usertype } = useContext(GeneralContext);
  // If not logged in, send to /auth
  if (!usertype) {
    return <Navigate to="/auth" replace />;
  }
  // Otherwise, render the protected page
  return children;
};

export default AuthProtector;
