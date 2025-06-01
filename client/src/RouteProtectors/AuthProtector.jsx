import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthProtector = ({ children, allowedRoles = [] }) => {
  const userType = localStorage.getItem('userType');
  const location = useLocation();

  if (!userType) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If allowedRoles is defined and userType isn't included
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthProtector;
