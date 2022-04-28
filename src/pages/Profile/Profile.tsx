import React from 'react';

import './Profile.scss';

import { Link } from 'react-router-dom';
// import { changeUserProfile } from '../../api/api';
import { ERoutes } from '../../App';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useInput } from '../../hooks/useInput';

const Profile = () => {
  // const navigate = useNavigate();

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

  // const formMethod = {
  //   first_name: username.value,
  //   second_name: 'Second',
  //   login: login.value,
  //   email: email.value,
  //   password: password.value,
  //   phone: '+7-000-000-00-00'
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // changeUserProfile(formMethod)
    //   // eslint-disable-next-line no-console
    //   .then(() => {
    //     navigate(ERoutes.GAME);
    //   })
    //   // eslint-disable-next-line no-console
    //   .catch((event: any) => console.log(`Ошибка ${event}`));
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    // await postLogout()
    //   .then(() => {
    //     navigate(ERoutes.LOGIN);
    //   })
    //   .catch((event: any) => console.log(`Ошибка ${event}`));
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Профиль</h1>
        <div className='form__wrapper'>
          <Input className='form__input' name='username' type='text' placeholder='Имя'
                 value={username.value} onBlur={username.onBlur}
                 onChange={(e: HTMLInputElement) => username.onChange(e)}
                 isDirty={username.isDirty} isEmpty={username.isEmpty}
                 isError={username.usernameError}/>
        </div>
        <div className='form__wrapper'>
          <Input className='form__input' name='login' type='text' placeholder='Логин'
                 value={login.value} onBlur={login.onBlur}
                 onChange={(e: HTMLInputElement) => login.onChange(e)}
                 isDirty={login.isDirty} isEmpty={login.isEmpty} isError={login.loginError}/>
        </div>
        <div className='form__wrapper'>
          <Input className='form__input' name='email' type='email' placeholder='email адрес'
                 value={email.value} onBlur={email.onBlur}
                 onChange={(e: HTMLInputElement) => email.onChange(e)}
                 isDirty={email.isDirty} isEmpty={email.isEmpty} isError={email.emailError}/>
        </div>
        <div className='form__wrapper'>
          <Input className='form__input' name='password' type='password' placeholder='Пароль'
                 value={password.value} onBlur={password.onBlur}
                 onChange={(e: HTMLInputElement) => password.onChange(e)}
                 isDirty={password.isDirty} isEmpty={password.isEmpty}
                 isError={password.passwordError}/>
        </div>
        <Button type='submit' title='Сохранить' onClick={(e: any) => handleSubmit(e)}
                disabled={!username.inputValid
                || !login.inputValid
                || !email.inputValid
                || !password.inputValid}/>
      </form>
      <Link className='register' to={ERoutes.LOGIN}>Login</Link>
      <Button title='Выход' onClick={handleLogout}/>
    </div>
  );
};

export default Profile;
