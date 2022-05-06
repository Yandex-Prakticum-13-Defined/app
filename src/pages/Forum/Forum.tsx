import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './Forum.scss';

const Forum: FC = () => (
  <section className='forum'>
    <h1 className='forum__title'>Форум игры Arkanoid</h1>
    <Outlet />
  </section>
);

export default Forum;
