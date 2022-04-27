import React from 'react';
import './Error.scss';
import { Link } from 'react-router-dom';
import { ERoutes } from '../../App';

const Error500 = () => (
  <div className='error-container'>
    <h1>Внутренняя ошибка сервера</h1>
    <h2>Мы знаем о проблеме и стараемся ее решить</h2>
    <Link className='error-container__link' to={ERoutes.START}>На главную</Link>
  </div>
);

export default Error500;
