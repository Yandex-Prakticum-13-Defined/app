import React from 'react';
import { Outlet } from 'react-router-dom';
import './Forum.scss';

function Forum() {
  return (
    <>
      <section className='forum'>
        <h1 className='forum__title'>Форум игры Arkanoid</h1>
        <Outlet/>
      </section>
    </>
  );
}

export default Forum;
