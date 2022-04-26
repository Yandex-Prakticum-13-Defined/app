import {Link} from "react-router-dom";
import React from "react";
import './Modal.scss'

const Modal = () => {
  return (
    <div className='modal'>
      <h2 className='modal__title'>Game over</h2>
      <Link className='modal__link' to='/'>На главную</Link>
      <Link className='modal__link' to='/register'>Таблица лидеров</Link>
      <Link className='modal__link' to='/game'>Повторить игру</Link>
    </div>
  )
}

export default Modal
