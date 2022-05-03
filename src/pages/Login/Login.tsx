import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Login.scss';
import { ERoutes } from '../../App';
import Form from '../../components/Form/Form';
import { FormInput } from '../../components/Form/FormInput';
import { useAuth } from '../../hook/useAuth';
import { PATTERN_VALIDATION } from '../../utils/Const';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // @ts-ignore
  const fromPage = location?.state?.from?.pathname || ERoutes.START;
  const { signin } = useAuth();

  const {
    formState: {
      isValid
    },
    control,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = getValues();
    signin(user, () => navigate(fromPage || ERoutes.START, { replace: true }));
  };

  return (
    <div className='container'>
      <Form
        title='Авторизация'
        handleSubmit={handleSubmit}
        button={{
          type: 'submit',
          title: 'Войти',
          disabled: !isValid,
        }}
      >
        <>
          <FormInput
            name='login'
            type='text'
            placeholder='Логин'
            className='form__input'
            control={control}
            rules={{
              required: PATTERN_VALIDATION.required,
              minLength: PATTERN_VALIDATION.minLength_3,
              maxLength: PATTERN_VALIDATION.maxLength,
              pattern: PATTERN_VALIDATION.login,
            }}
          />
          <FormInput
            name='password'
            type='password'
            placeholder='введите новый пароль'
            className='form__input'
            control={control}
            rules={{
              required: PATTERN_VALIDATION.required,
              pattern: PATTERN_VALIDATION.password,
              minLength: PATTERN_VALIDATION.minLength_8
            }}
          />
        </>
      </Form>
      <Link className='register' to={ERoutes.REGISTER}>Регистрация</Link>
    </div>
  );
};

export default Login;
