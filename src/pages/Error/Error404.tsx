import React from 'react';
import './Error.scss';
import { Link } from 'react-router-dom';
import { ERoutes } from '../../utils/constants/routes';

const Error404 = () => (
  <div className='error-container'>
    <h1>Страница не найдена</h1>
    <h2>Перейдите на главную страницу</h2>
    <Link className='error-container__link' to={ERoutes.START}>На главную</Link>
  </div>
);

export default Error404;
