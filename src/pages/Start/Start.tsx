import React from 'react';
import './Start.scss';
import { Link } from 'react-router-dom';
import { ERoutes } from '../../App';

const Start = () => (
  <div className='start'>
    <h1>Привет Арканоид</h1>
    <h2> Коротко о правилах игры</h2>
     <div className='start__container'>
      <Link className='start__link' to={ERoutes.LOGIN}>Войти</Link>
      <Link className='start__link' to={ERoutes.REGISTER}>Зарегистрироваться</Link>
      <Link className='start__link' to={ERoutes.GAME}>Начать игру</Link>
     </div>
  </div>
);

export default Start;
