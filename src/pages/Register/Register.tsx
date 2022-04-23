import React from 'react';
import './Register.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button/Button';

const Register = () => {
  const handleSubmit = () => {
  };

  return (
    <div className='container'>
      <h1>Sign up</h1>
      <form className='form' onSubmit={handleSubmit}>
        <Input className='form__input' name='first_name' type='text' placeholder='username'/>
        <Input className='form__input' name='login' type='text' placeholder='login'/>
        <Input className='form__input' name='email' type='email' placeholder='email address'/>
        <Input className='form__input' name='password' type='password' placeholder='password'/>
      </form>
      <Button title='Register'/>
    </div>
  );
};

export default Register;
