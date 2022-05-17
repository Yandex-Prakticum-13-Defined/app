import React, { FC, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import { useAppSelector } from '../hook/useAppSelector';
import { getUser } from '../store/slice/userSlice';
import { useAppDispatch } from '../hook/useAppDispatch';
import { ERoutes } from '../utils/constants/routes';

interface IRequireAuth {
  children: JSX.Element;
}

const Auth: FC<IRequireAuth> = ({ children }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const userId = useAppSelector((state) => state.user.data.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    if (!userId) {
      await dispatch(getUser());
      setLoading(false);
    }
  }

  if (loading) {
    return <Spinner/>;
  }

  if (!userId && ![ERoutes.LOGIN, ERoutes.REGISTER, ERoutes.START].includes(location.pathname as ERoutes)) {
    return <Navigate to={ERoutes.LOGIN} state={{ from: location }} replace/>;
  }

  if (userId && [ERoutes.LOGIN, ERoutes.REGISTER].includes(location.pathname as ERoutes)) {
    return <Navigate to={ERoutes.START} state={{ from: location }} replace/>;
  }

  return children;
};

export default Auth;
