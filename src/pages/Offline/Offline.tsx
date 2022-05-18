import React, { FC } from 'react';
import './Offline.scss';

const Offline: FC = () => (
  <div className='offline'>
    <h1>Ваше приложение сейчас не в сети.</h1>
    <h2>Попробуйте позже.</h2>
  </div>
);

export default Offline;
