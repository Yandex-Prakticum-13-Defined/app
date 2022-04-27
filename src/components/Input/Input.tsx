import React from 'react';
import './Input.scss';

interface IInput {
  className?: string;
  id?: string;
  name: string | any;
  title?: string;
  type: string;
  value?: string;
  onChange?: any;
  onBlur?: any;
  placeholder?: string;
  isEmpty?: IEmpty;
  isError?: IEmpty;
  isDirty?: boolean;
}

interface IEmpty {
  isError?: boolean;
  error?: string;
}

const Input = ({
  className,
  id,
  name,
  title,
  type,
  value,
  onChange,
  placeholder,
  onBlur,
  isEmpty,
  isError,
  isDirty
}: IInput) => (

    <div className='input'>
      {title && <label htmlFor={name} className='label'>{title}</label>}
      <input className={className} id={id} name={name} type={type} value={value} onChange={onChange}
             placeholder={placeholder} onBlur={onBlur}/>
      {isDirty && isEmpty?.isError && <div className='input__error'>{isEmpty?.error}</div>}
      {isDirty && isError?.isError && <div className='input__error'>{isError?.error}</div>}
    </div>
);

export default Input;
