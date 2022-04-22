import React from 'react';
import './Button.scss'

interface IButton {
  className?: string;
  onClick?: () => void;
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({
                  className,
                  onClick,
                  title,
                  type,
                }: IButton) => {
  return (
    <button className={className ? className : 'button'} onClick={onClick} type={type}>
      {title}
    </button>
  )
}

export default Button;
