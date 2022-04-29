import React, { MouseEventHandler } from 'react';
import './Button.scss';

interface IButton {
  className?: string;
  onClick?: MouseEventHandler;
  title?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

const Button = ({
  className,
  onClick,
  title,
  type,
  disabled
}: IButton) => (
  <button className={className || 'button'} onClick={onClick} type={type} disabled={disabled}>
    {title}
  </button>
);

export default Button;
