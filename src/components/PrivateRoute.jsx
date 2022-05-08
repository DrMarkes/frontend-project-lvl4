import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

function PrivateRoute({ children }) {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;
