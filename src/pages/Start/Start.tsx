import React from 'react';
import './Start.scss';

import Button from '../../components/Button/Button';

const Start = () => (
  <div className='start'>
    <h1>Привет Арканоид</h1>
    <h2> Коротко о правилах игры</h2>
    <div className='start__button'>
      <Button title='Войти' onClick={() => {
        window.location.href = '/login';
      }}/>
      <Button title='Зарегистрироваться' onClick={() => {
        window.location.href = '/register';
      }}/>
      <Button title='Начать игру' onClick={() => {
        window.location.href = '/game';
      }}/>
    </div>
  </div>
);

export default Start;
