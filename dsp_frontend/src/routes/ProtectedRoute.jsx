import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * ProtectedRoute guards child components and redirects to /login if no token.
 * @param {object} props - children components
 * @returns children or redirect
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('auth_token');
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
