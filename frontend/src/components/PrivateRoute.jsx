/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Access user state from AuthContext

  // If the user is authenticated, render the children; otherwise, redirect to login
  return user ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
