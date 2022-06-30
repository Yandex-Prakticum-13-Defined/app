import React, { FC, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import Form from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { VALIDATION } from '../../utils/constants/validation';
import { signIn } from '../../API/authAPI';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getUser } from '../../store/slice/userSlice';
import { ERoutes } from '../../utils/constants/routes';
import Button from '../../components/Button/Button';
import {
  getServiceId, redirectUri
} from '../../API/OAuthAPI';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    formState: {
      isValid
    },
    control,
    getValues,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: ''
    }
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = getValues();

    try {
      await signIn(user);
      await dispatch(getUser());
      reset();
      navigate(ERoutes.START, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOAuthClick = async () => {
    const { service_id: serviceId } = await getServiceId();
    // eslint-disable-next-line max-len
    window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`;
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
      <Button type='button' title='Войти через Яндекс' onClick={handleOAuthClick}/>
    </section>
  );
};

export default Login;
