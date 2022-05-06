import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ERoutes } from '../../App';
import './Register.scss';
import Form from '../../components/Form/Form';
import { FormInput } from '../../components/FormInput/FormInput';
import Spacer from '../../components/Spacer/Spacer';
import { useAuth } from '../../hook/useAuth';
import { PATTERN_VALIDATION } from '../../utils/Const';

const Register = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    formState: {
      isValid
    },
    control,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      first_name: '',
      login: '',
      email: '',
      password: '',
    },
  });

  const formMethod = {
    second_name: 'Second',
    phone: '+7-000-000-00-00'
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      username,
      login,
      email,
      password
    } = getValues();

    signup({
      ...formMethod,
      first_name: username,
      login,
      email,
      password
    }, () => {
      navigate(ERoutes.START, { replace: true });
    });
  };

  return (
    <div className='container'>
      <Form
        title='Регистрация'
        handleSubmit={handleSubmit}
        button={{
          type: 'submit',
          title: 'Зарегистрироваться',
          disabled: !isValid,
        }}
      >
        <>
          <FormInput
            name='username'
            type='text'
            placeholder='Имя'
            className='form__input'
            control={control}
            rules={{
              required: PATTERN_VALIDATION.required,
              pattern: PATTERN_VALIDATION.name,
            }}
          />
          <Spacer className='spacer spacer__height' />
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
          <Spacer className='spacer spacer__height' />
          <FormInput
            name='email'
            type='email'
            placeholder='email адрес'
            className='form__input'
            control={control}
            rules={{
              required: PATTERN_VALIDATION.required,
              pattern: PATTERN_VALIDATION.email,
            }}
          />
          <Spacer className='spacer spacer__height' />
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
          <Spacer className='spacer spacer__height' />
        </>
      </Form>
      <Link className='register' to={ERoutes.LOGIN}>Авторизация</Link>
    </div>
  );
};

export default Register;
