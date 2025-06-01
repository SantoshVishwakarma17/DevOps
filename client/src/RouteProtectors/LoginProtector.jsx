// src/RouteProtectors/LoginProtector.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const LoginProtector = ({ children }) => {
  const { usertype } = useContext(GeneralContext);

  // If usertype exists, redirect to their home
  if (usertype) {
    if (usertype === 'customer') return <Navigate to="/" replace />;
    if (usertype === 'admin') return <Navigate to="/admin" replace />;
    if (usertype === 'flight-operator') return <Navigate to="/flight-admin" replace />;
  }
  // If not logged in, let them see the login page
  return children;
};

export default LoginProtector;
