import React, { FC, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.scss';
import Form from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hook/useAuth';
import { VALIDATION } from '../../utils/constants/validation';
import { ERoutes } from '../../utils/constants/routes';

const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fromPage = location?.state?.from?.pathname;
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
      password: ''
    }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = getValues();
    signin(user, () => navigate(fromPage || ERoutes.START, { replace: true }));
  };

  return (
    <section className='login'>
      <Form
        title='Авторизация'
        handleSubmit={handleSubmit}
        button={{
          type: 'submit',
          title: 'Войти',
          disabled: !isValid
        }}
        linkTo={ERoutes.REGISTER}
        linkText='Регистрация'
      >
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

export default Login;
