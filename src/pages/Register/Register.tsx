import React from "react";
import './Register.scss'
// @ts-ignore
import register_fon from '../../img/register_fon.png'
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button/Button";
// import {useForm} from 'react-hook-form'

export const Register = () => {

//   const formMethod = useForm({
//     mode: 'onChange',
//     defaultValue: {
//       first_name: '',
//       second_name: '',
//       login: '',
//       email: '',
//       password: '',
//       phone: ''
//     }
//   })
// console.log(formMethod)
  // const {
  //   // control,
  //   // formState: {isValid},
  //   // getValue,
  //   // setWalue,
  //   // watch
  // } = formMethod

  const handleSubmit = () => {
    console.log('submit')
  }

  console.log(register_fon)
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
  )
}
