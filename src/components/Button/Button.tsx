import React, { FC } from 'react';
import './Button.scss';

export interface IButton {
  className?: string;
  onClick?: () => void;
  title?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

const Button:FC<IButton> = ({
  className,
  onClick,
  title,
  type,
  disabled
}) => (
  <button className={className || 'button'} onClick={onClick} type={type} disabled={disabled}>
    {title}
  </button>
);

export default Button;
