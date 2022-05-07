import React, { FC } from 'react';
import './Start.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ERoutes } from '../../App';
import { useAuth } from '../../hook/useAuth';

const Start: FC = () => {
  const navigate = useNavigate();
  const { signout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    signout(() => navigate(ERoutes.LOGIN, { replace: true }));
  };

  return (
    <section className='start'>
      <h1 className='start__title'>Арканоид</h1>
      <p className='start__text'>
        В нижней части экрана находится ракетка,
        которая перемещается горизонтально с помощью мыши или стрелок клавиатуры.
        В верхней части экрана расположены блоки,
        которые разрушаются при попадании в них мячика.
        Если не удалось отбить мячик ракеткой, то игра заканчивается.
      </p>
      <div className='start__links'>
        {isAuthenticated ? (
          <>
            <Link className='start__link' to={ERoutes.GAME}>Начать игру</Link>
            <Link className='start__link' to={ERoutes.PROFILE}>Профиль</Link>
            <Link className='start__link' to={ERoutes.LEADERBOARD}>Таблица лидеров</Link>
            <Link className='start__link' to={ERoutes.FORUM}>Форум</Link>
            <Link className='start__link' onClick={handleLogout} to={ERoutes.LOGIN}>Выйти</Link>
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
