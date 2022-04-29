import React, { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { postSignIn } from '../../api/api';
import { ValidationInput } from '../../components/ValidationInput/ValidationInput';

/** Логин: от 3 до 20 символов, латиница, может содержать цифры,
 * но не состоять из них, без пробелов, без спецсимволов
 * (допустимы дефис и нижнее подчёркивание */
const loginRegexp = /^(?=.{3,20}$)([a-zA-Z0-9_-]*[a-zA-Z_-][a-zA-Z0-9_-]*)$/;
const loginErrorMessage = 'Логин должен начинаться с заглавной буквы и состоять минимум из 3 символов';

/** Пароль: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра */
const passwordRegexp = /^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$/;
const passwordErrorMessage = 'Введите пароль от 8 до 40 символов. Обязательно наличие заглавной буквы и цифры';

interface IInputsValidation {
  isLoginValid: boolean;
  isPasswordValid: boolean;
}

const Login: React.FC = () => {
  const initialInputsValidation: IInputsValidation = {
    isLoginValid: false,
    isPasswordValid: false
  };
  const [inputsValidation, setInputsValidation] = useState(initialInputsValidation);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const isInputsValidationOK = inputsValidation.isLoginValid && inputsValidation.isPasswordValid;

  const handleSubmit = () => {
    postSignIn({ login, password })
      // eslint-disable-next-line no-console
      .then((data) => console.log(data))
      // eslint-disable-next-line no-console
      .catch((error: any) => console.log(`Ошибка ${error}`));
  };

  const checkLoginValidation = (isValid: boolean) => setInputsValidation(
    { ...inputsValidation, isLoginValid: isValid }
  );

  const checkPasswordValidation = (isValid: boolean) => setInputsValidation(
    { ...inputsValidation, isPasswordValid: isValid }
  );

  const onLoginChange = (text: string) => setLogin(text);
  const onPasswordChange = (text: string) => setPassword(text);

  return (
    <div className='container'>
      <form className='form'>
        <h1 className='form__title'>Welcome</h1>
        <div className='form__wrapper'>
          <ValidationInput
            className='form__input' onTextChange={onLoginChange} errorMessage={loginErrorMessage}
            regexp={loginRegexp} checkValidation={checkLoginValidation} placeholder='Логин'
          />
        </div>
        <div className='form__wrapper'>
          <ValidationInput
            className='form__input' onTextChange={onPasswordChange} errorMessage={passwordErrorMessage}
            regexp={passwordRegexp} checkValidation={checkPasswordValidation} type={'password'} placeholder='Пароль'
          />
        </div>
        <Button type='submit' title='Login' onClick={handleSubmit} disabled={!isInputsValidationOK}/>
      </form>
      <Link className='register' to='/register'>Register</Link>
    </div>
  );
};

export default Login;
