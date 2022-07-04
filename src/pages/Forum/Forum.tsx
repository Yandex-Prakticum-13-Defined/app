import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Forum.scss';
import { ERoutes } from '../../utils/constants/routes';

const Forum: FC = () => (
  <section className='forum'>
    <h1 className='forum__title'>Форум игры Arkanoid</h1>
    <Link className='forum__backlink' to={ERoutes.START}>На главную</Link>
    <Outlet/>
  </section>
);

export default Forum;
