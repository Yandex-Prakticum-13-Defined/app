import React from 'react';

import './Register.scss';
import { postUser } from '../../api/api';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button/Button';
import { useInput } from '../../hooks/useInput';

const Register = () => {
  const username = useInput('', {
    isEmpty: true,
    username: {
      isError: null,
      error: ''
    }
  });
  const login = useInput('', {
    isEmpty: true,
    login: {
      isError: null,
      error: ''
    }
  });
  const email = useInput('', {
    isEmpty: true,
    email: {
      isError: null,
      error: ''
    }
  });
  const password = useInput('', {
    isEmpty: true,
    password: {
      isError: null,
      error: ''
    }
  });

  const formMethod = {
    first_name: username.value,
    second_name: 'Second',
    login: login.value,
    email: email.value,
    password: password.value,
    phone: '+7-000-000-00-00'
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    postUser(formMethod)
      // eslint-disable-next-line no-console
      .then((id) => console.log(`Пользователь с id ${id} успешно зарегистрирован!`))
      // eslint-disable-next-line no-console
      .catch((e: any) => console.log(`Ошибка ${e}`));
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Sign up</h1>
        <div className='form__wrapper'>
          <Input className='form__input' name='username' type='text' placeholder='username'
                 value={username.value} onBlur={username.onBlur}
                 onChange={(e: HTMLInputElement) => username.onChange(e)}/>
          {(username.isDirty && username.isEmpty.isError)
          && <div className='form__error'>{username.isEmpty.error}</div>}
          {(username.isDirty && username.usernameError.isError)
          && <div className='form__error'>{username.usernameError.error}</div>}
        </div>
        <div className='form__wrapper'>
          <Input className='form__input' name='login' type='text' placeholder='login'
                 value={login.value} onBlur={login.onBlur}
                 onChange={(e: HTMLInputElement) => login.onChange(e)}/>
          {(login.isDirty && login.isEmpty.isError)
          && <div className='form__error'>{login.isEmpty.error}</div>}
          {(login.isDirty && login.loginError.isError)
          && <div className='form__error'>{login.loginError.error}</div>}
        </div>
        <div className='form__wrapper'>
          <Input className='form__input' name='email' type='email' placeholder='email address'
                 value={email.value} onBlur={email.onBlur}
                 onChange={(e: HTMLInputElement) => email.onChange(e)}/>
          {(email.isDirty && email.isEmpty.isError)
          && <div className='form__error'>{email.isEmpty.error}</div>}
          {(email.isDirty && email.emailError.isError)
          && <div className='form__error'>{email.emailError.error}</div>}
        </div>
        <div className='form__wrapper'>
          <Input className='form__input' name='password' type='password' placeholder='password'
                 value={password.value} onBlur={password.onBlur}
                 onChange={(e: HTMLInputElement) => password.onChange(e)}/>
          {(password.isDirty && password.isEmpty.isError)
          && <div className='form__error'>{password.isEmpty.error}</div>}
          {(password.isDirty && password.passwordError.isError)
          && <div className='form__error'>{password.passwordError.error}</div>}
        </div>
        <Button type='submit' title='Register' onClick={(e: any) => handleSubmit(e)}
                disabled={!username.inputValid
                || !login.inputValid
                || !email.inputValid
                || !password.inputValid}/>
      </form>
    </div>
  );
};

export default Register;
