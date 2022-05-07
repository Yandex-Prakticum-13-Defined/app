import React, { FC } from 'react';
import './Button.scss';

export interface IButton {
  className?: string;
  onClick?: () => void;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: FC<IButton> = ({
  className,
  onClick,
  title,
  type,
  disabled
}) => (
  // eslint-disable-next-line react/button-has-type
  <button className={className || 'button'} onClick={onClick} type={type} disabled={disabled}>
    {title}
  </button>
);

export default Button;
