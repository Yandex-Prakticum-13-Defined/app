import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ERoutes } from '../App';
import { useAuth } from '../hook/useAuth';

const RequireAuth = ({ children }: any) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ERoutes.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
