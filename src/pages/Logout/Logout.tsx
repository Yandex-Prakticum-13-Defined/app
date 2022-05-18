import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../api/api';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { clearUserData } from '../../store/slice/userSlice';
import { ERoutes } from '../../utils/constants/routes';

const Logout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const response = await logOut();

    if (response === 'OK') {
      dispatch(clearUserData());
      navigate(ERoutes.START, { replace: true });
    }
  };

  useEffect(() => { handleLogout(); }, []);

  return (
    <p>...Logout</p>
  );
};

export default Logout;
