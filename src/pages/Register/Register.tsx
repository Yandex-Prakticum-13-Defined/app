import React from 'react';
// import {useForm} from 'react-hook-form'

import './Register.scss';
import { postUser } from '../../api/api';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button/Button';

const Register = () => {
  const formMethod = {
    first_name: 'name',
    second_name: 'Second',
    login: 'login123211',
    email: 'email@email1.ru',
    password: 'Asdasd123sdf',
    phone: '+7-000-000-00-00'
  };

  const handleSubmit = () => {
    postUser(formMethod)
      // eslint-disable-next-line no-console
      .then((id) => console.log(`Пользователь с id ${id} успешно загеристрирован!`))
      // eslint-disable-next-line no-console
      .catch((e) => console.log(`Ошибка ${e}`));
  };

  const handleChange = () => {

  };

  return (
    <div className='container'>
      <h1>Sign up</h1>
      <form className='form' onSubmit={handleSubmit}>
        <Input className='form__input' name='first_name' type='text' placeholder='username'
               value={'userName'} onChange={handleChange}/>
        <Input className='form__input' name='login' type='text' placeholder='login'/>
        <Input className='form__input' name='email' type='email' placeholder='email address'/>
        <Input className='form__input' name='password' type='password' placeholder='password'/>
      </form>
      <Button onClick={handleSubmit} title='Register'/>
    </div>
  );
};

export default Register;
