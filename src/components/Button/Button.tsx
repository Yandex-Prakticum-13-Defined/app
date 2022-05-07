import React, { FC } from 'react';
import './Button.scss';

export interface IButton {
  onClick?: () => void;
  title?: string;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: FC<IButton> = ({
  onClick,
  title,
  type,
  disabled
}) => (
  // eslint-disable-next-line react/button-has-type
  <button className='button' onClick={onClick} type={type} disabled={disabled}>
    {title}
  </button>
);

export default Button;
