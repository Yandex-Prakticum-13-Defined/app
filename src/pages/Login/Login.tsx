import React from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ERoutes } from '../../App';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useInput } from '../../hooks/useInput';
import { getUser, postSignIn } from '../../api/api';

const Login = () => {
  const navigate = useNavigate();
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
    const user = getUser();

    console.log(user);
    postSignIn(formMethod)
      // eslint-disable-next-line no-console
      .then(() => {
        navigate(ERoutes.PROFILE);
      })
      // eslint-disable-next-line no-console
      .catch((error: any) => console.log(`Ошибка ${error}`));
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Авторизация</h1>
        <div className='form__wrapper'>
          <Input className='form__input' name='login' type='text' placeholder='login'
                 value={login.value} onBlur={login.onBlur}
                 onChange={(e: HTMLInputElement) => login.onChange(e)}
                 isDirty={login.isDirty} isEmpty={login.isEmpty} isError={login.loginError}/>
        </div>
        <div className='form__wrapper'>
          <Input className='form__input' name='password' type='password' placeholder='password'
                 value={password.value} onBlur={password.onBlur}
                 onChange={(e: HTMLInputElement) => password.onChange(e)}
                 isDirty={password.isDirty} isEmpty={password.isEmpty}
                 isError={password.passwordError}/>
        </div>
        <Button type='submit' title='Войти' onClick={(e: any) => handleSubmit(e)}
                disabled={!login.inputValid || !password.inputValid}/>
      </form>
      <Link className='register' to={ERoutes.REGISTER}>Регистрация</Link>
    </div>
  );
};

export default Login;
