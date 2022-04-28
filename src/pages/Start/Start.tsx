import React, { useEffect, useState } from 'react';
import './Start.scss';
import { Link } from 'react-router-dom';
import {
  getProfile, getUser, postLogout, postSignIn
} from '../../api/api';
import { ERoutes } from '../../App';

const Start = () => {
  const [u, setU] = useState({});
  useEffect(() => {
    postSignIn({ login: 'Testtt', password: 'Qwerty123' }).then().catch(() => console.log('херня'));
    getUser().then((res) => res).catch(() => console.log('юзер тоже'));
  }, []);

  const o = getProfile(28506);

  // if (user) {
  //   setU(user);
  // }

  // .then((data) => {
  //   setU(data);
  //   console.log(data);
  // }).catch((e) => console.log(e));

  // console.log('122', user);
  console.log('122', o);
  console.log('122', u, setU);

  const handleLogout = () => {
    // e.preventDefault();
    postLogout()
      .then((r) => {
        console.log(r);
        // navigate(ERoutes.LOGIN);
      }).catch(() => console.log('задрало'));
  };

  return (
    <div className='start'>
      <h1 className='start__title'>Арканоид</h1>
      <h2 className='start__subTitle'>В нижней части экрана находится ракетка,
        которая перемещается горизонтально с помощью мыши или стрелок клавиатуры.
        В верхней части экрана расположены блоки,
        которые разрушаются при попадании в них мячика.</h2>
      <h2 className='start__subTitle'>Если не удалось отбить мячик ракеткой, то игра
        заканчивается</h2>
      <div className='start__container'>
        <Link className='start__link' to={ERoutes.LOGIN}>Войти</Link>
        {/* <Link className='start__link' onClick={handleLogout} to={ERoutes.LOGIN}>Выйти</Link> */}
        <Link className='start__link' onClick={handleLogout} to='#'>Выйти</Link>
        <Link className='start__link' to={ERoutes.REGISTER}>Зарегистрироваться</Link>
        <Link className='start__link' to={ERoutes.GAME}>Начать игру</Link>
      </div>
    </div>
  );
};

export default Start;
