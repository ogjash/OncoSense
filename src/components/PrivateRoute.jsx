import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../context/UseAuth';
const PrivateRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute; 