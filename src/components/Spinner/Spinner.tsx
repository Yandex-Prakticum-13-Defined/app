import React from 'react';
import './Spinner.scss';

const Spinner = () => (
  <div className='preloader'>
    <div className='preloader__row'>
      <div className='preloader__item'></div>
      <div className='preloader__item'></div>
    </div>
  </div>
);

export default Spinner;
