import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../API/authAPI';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clearUserData } from '../../store/slice/userSlice';
import { ERoutes } from '../../utils/constants/routes';

const Logout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(clearUserData());
      navigate(ERoutes.START, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <p>...Logout</p>
  );
};

export default Logout;
