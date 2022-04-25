import React from 'react';
import './Input.scss';

interface IInput {
  className?: string;
  id?: string;
  name: string;
  title?: string;
  type: string;
  value?: string;
  onChange?: any;
  onBlur?: any;
  placeholder?: string;
  username?: IName;
  login?: IName;
  email?: IName;
  password?: IName;
}

interface IEmpty {
  isError?: boolean;
  error?: string;
}

interface IName {
  emailError?: IEmpty;
  inputValid?: boolean;
  isEmpty?: IEmpty;
  isDirty?: boolean;
  passwordError?: IEmpty;
  loginError?: IEmpty;
  usernameError?: IEmpty;
  value?: string
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
  username,
  login,
  email,
  password
}: IInput) => (
  <div className='input'>
    {title && <label htmlFor={name} className="label">{title}</label>}
    <input className={className} id={id} name={name} type={type} value={value} onChange={onChange}
           placeholder={placeholder} onBlur={onBlur} />
    {(username?.isDirty && username?.isEmpty?.isError)
    && <div className='input__error'>{username?.isEmpty?.error}</div>}
    {(username?.isDirty && username?.usernameError?.isError)
    && <div className='input__error'>{username?.usernameError?.error}</div>}
    {(login?.isDirty && login?.isEmpty?.isError)
    && <div className='input__error'>{login?.isEmpty?.error}</div>}
    {(login?.isDirty && login?.loginError?.isError)
    && <div className='input__error'>{login?.loginError?.error}</div>}
    {(email?.isDirty && email?.isEmpty?.isError)
    && <div className='input__error'>{email?.isEmpty?.error}</div>}
    {(email?.isDirty && email?.emailError?.isError)
    && <div className='input__error'>{email?.emailError?.error}</div>}
    {(password?.isDirty && password?.isEmpty?.isError)
    && <div className='input__error'>{password?.isEmpty.error}</div>}
    {(password?.isDirty && password?.passwordError?.isError)
    && <div className='input__error'>{password?.passwordError?.error}</div>}
  </div>
);

export default Input;
