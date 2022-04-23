import React from "react";
import './Login.scss'
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button/Button";

export const Login = () => {

  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <div className='container'>
      <h1>Welcome</h1>
      <form className='form' onSubmit={handleSubmit}>
        <Input className='form__input' name='login' type='text' placeholder='login'/>
        <Input className='form__input' name='password' type='password' placeholder='password'/>
      </form>
      <Button title='Login'/>
      <a className='register' href='/register'>Register</a>
    </div>
  )
}
