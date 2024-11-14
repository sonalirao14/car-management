import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  // If user is authenticated, redirect to the /cars page
  return isAuthenticated ? <Navigate to="/cars" /> : children;
};

export default PrivateRoute;
