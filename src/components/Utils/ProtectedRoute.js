import React from 'react';
import { Navigate } from 'react-router-dom';

// This component takes in three props: the element to render if authenticated, the isAuthenticated state, and a fallback element
const ProtectedRoute = ({ element, isAuthenticated, fallback }) => {
  return isAuthenticated ? element : fallback ? fallback : <Navigate to="/login" />;
};

export default ProtectedRoute;
