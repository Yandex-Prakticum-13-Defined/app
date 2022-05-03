import React from 'react';

import { Link, Route } from 'react-router-dom';
import { ERoutes } from '../../App';

const ProtectedRoute = ({ component: Component, ...restOfProps }: any) => {
  const isAuthenticated = localStorage.getItem('id');

  return (
    <Route
      {...restOfProps}
      render={(props: any) => (isAuthenticated ? <Component {...props} /> : <Link to={ERoutes.LOGIN} />)}
    />
  );
};

export default ProtectedRoute;
