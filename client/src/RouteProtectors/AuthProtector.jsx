// AuthProtector.jsx
import { Navigate } from 'react-router-dom';

const AuthProtector = ({ children }) => {
  const userType = localStorage.getItem('userType');

  // If no userType found, redirect to login
  if (!userType) {
    return <Navigate to="/auth" replace />;
  }

  // Otherwise, render protected children
  return children;
};

export default AuthProtector;
