import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import './Register.scss';

import { postUser } from '../../api/api';
import { ERoutes } from '../../App';
import Form from '../../components/Form/Form';
import { FormInput } from '../../components/Form/FormInput';
import { PATTERN_VALIDATION } from '../../utils/Const';

const Register = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
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

  const onSubmit = () => {
    const {
      username,
      login,
      email,
      password
    } = getValues();
    postUser({
      ...formMethod,
      first_name: username,
      login,
      email,
      password
    })
      .then((id) => {
        localStorage.id = id;
        navigate(ERoutes.START);
      })
      .catch();
  };

  return (
    <div className='container'>
      <Form
        title='Регистрация'
        handleSubmit={handleSubmit(onSubmit)}
        children={
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
        }
        button={{
          type: 'submit',
          title: 'Зарегистрироваться',
          disabled: !isValid,
        }}
      />
      <Link className='register' to={ERoutes.LOGIN}>Авторизация</Link>
    </div>
  );
};

export default Register;
