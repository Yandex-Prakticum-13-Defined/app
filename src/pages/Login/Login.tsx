import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button/Button';

const Login = () => {
  const handleSubmit = () => {
  };

  return (
    <div className='container'>
      <h1>Welcome</h1>
      <form className='form' onSubmit={handleSubmit}>
        <Input className='form__input' name='login' type='text' placeholder='login'/>
        <Input className='form__input' name='password' type='password' placeholder='password'/>
      </form>
      <Button title='Login'/>
      <Link className='register' to='/register'>Register</Link>
    </div>
  );
};

export default Login;
