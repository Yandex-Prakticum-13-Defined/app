import React, { FC, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import Form from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hook/useAuth';
import { VALIDATION } from '../../utils/constants/validation';
import { ERoutes } from '../../utils/constants/routes';

const Register: FC = () => {
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
      password: ''
    }
  });

  const formMethod = {
    second_name: 'Second',
    phone: '+7-000-000-00-00'
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    <section className='register'>
      <Form
        title='Регистрация'
        handleSubmit={handleSubmit}
        button={{
          type: 'submit',
          title: 'Зарегистрироваться',
          disabled: !isValid
        }}
        linkTo={ERoutes.LOGIN}
        linkText='Авторизация'
      >
        <Input
          name='username'
          type='text'
          placeholder='Имя'
          control={control}
          rules={{
            required: VALIDATION.required,
            pattern: VALIDATION.name
          }}
        />
        <Input
          name='login'
          type='text'
          placeholder='Логин'
          control={control}
          rules={{
            required: VALIDATION.required,
            minLength: VALIDATION.minLength_3,
            maxLength: VALIDATION.maxLength_20,
            pattern: VALIDATION.login
          }}
        />
        <Input
          name='email'
          type='email'
          placeholder='Email'
          control={control}
          rules={{
            required: VALIDATION.required,
            pattern: VALIDATION.email
          }}
        />
        <Input
          name='password'
          type='password'
          placeholder='Пароль'
          control={control}
          rules={{
            required: VALIDATION.required,
            pattern: VALIDATION.password,
            minLength: VALIDATION.minLength_8
          }}
        />
      </Form>
    </section>
  );
};

export default Register;
