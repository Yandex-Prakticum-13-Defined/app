import React from 'react';
import './Input.scss';

interface IInput {
  className?: string;
  id?: string;
  name: string;
  title?: string;
  type: string;
  value?: string;
  onChange?: () => void;
  placeholder?: string
}

const Input = ({
  className,
  id,
  name,
  title,
  type,
  value,
  onChange,
  placeholder
}: IInput) => (
    <div className='input__wrapper'>
      {title && <label htmlFor={name} className='label'>{title}</label>}
      <input className={className} id={id} name={name} type={type} value={value} onChange={onChange}
             placeholder={placeholder}/>
    </div>
);

export default Input;
