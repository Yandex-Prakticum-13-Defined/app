import React, { FC } from 'react';
import './Start.scss';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../api/api';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { clearUserData } from '../../store/slice/userSlice';
import { useAppSelector } from '../../hook/useAppSelector';
import { ERoutes } from '../../utils/constants/routes';

const Start: FC = () => {
  const isAuthenticated = useAppSelector((state) => !!state.user.data.id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logOut();

    if (response === 'OK') {
      dispatch(clearUserData());
      navigate(ERoutes.LOGIN, { replace: true });
    }
  };

  return (
    <section className='start'>
      <h1 className='start__title'>Арканоид</h1>
      <p className='start__text'>
        В нижней части экрана находится ракетка,
        которая перемещается горизонтально с помощью мыши или стрелок клавиатуры.
        В верхней части экрана расположены блоки,
        которые разрушаются при попадании в них мячика.
        Если трижды не удалось отбить мячик ракеткой, то игра заканчивается.
      </p>
      <div className='start__links'>
        {isAuthenticated ? (
          <>
            <Link className='start__link' to={ERoutes.GAME}>Начать игру</Link>
            <Link className='start__link' to={ERoutes.PROFILE}>Профиль</Link>
            <Link className='start__link' to={ERoutes.LEADERBOARD}>Таблица лидеров</Link>
            <Link className='start__link' to={ERoutes.FORUM}>Форум</Link>
            <button type='button' className='start__link' onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <>
            <Link className='start__link' to={ERoutes.LOGIN}>Войти</Link>
            <Link className='start__link' to={ERoutes.REGISTER}>Зарегистрироваться</Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Start;
