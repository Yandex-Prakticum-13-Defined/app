import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ERoutes } from '../App';
import Spinner from '../components/Spinner/Spinner';
import { useAuth } from '../hook/useAuth';

const RequireAuth = ({ children }: any) => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (!user) {
    return <Navigate to={ERoutes.LOGIN} state={{ from: location }} replace />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return children;
};

export default RequireAuth;
