import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button/Button';
import { useInput } from '../../hooks/useInput';
import { postSignIn } from '../../api/api';

const Login = () => {
  const login = useInput('', {
    isEmpty: true,
    login: {
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
    login: login.value,
    password: password.value,
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    postSignIn(formMethod)
      // eslint-disable-next-line no-console
      .then((data) => console.log(data))
      // eslint-disable-next-line no-console
      .catch((e: any) => console.log(`Ошибка ${e}`));
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Welcome</h1>
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
          <Input className='form__input' name='password' type='password' placeholder='password'
                 value={password.value} onBlur={password.onBlur}
                 onChange={(e: HTMLInputElement) => password.onChange(e)}/>
          {(password.isDirty && password.isEmpty.isError)
          && <div className='form__error'>{password.isEmpty.error}</div>}
          {(password.isDirty && password.passwordError.isError)
          && <div className='form__error'>{password.passwordError.error}</div>}
        </div>
      <Button type='submit' title='Login' onClick={(e: any) => handleSubmit(e)}
              disabled={!login.inputValid || !password.inputValid}/>
      </form>
      <Link className='register' to='/register'>Register</Link>
    </div>
  );
};

export default Login;
