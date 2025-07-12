import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
 

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate state={{from:location.pathname}} to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
