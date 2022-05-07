import React, { FC, FormEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.scss';
import { ERoutes } from '../../App';
import Form from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { VALIDATION } from '../../utils/constants/validation';
import { signIn } from '../../api/api';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { getUser } from '../../store/slice/userSlice';
import { useAppSelector } from '../../hook/useAppSelector';

interface ILocationState {
  from: {
    pathname: string;
  };
}

const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ILocationState;
  const userId = useAppSelector((rootState) => rootState.user.data.id);
  const status = useAppSelector((rootState) => rootState.user.status); // Статус запроса /user
  const pageFrom = state?.from?.pathname === ERoutes.LOGIN ? undefined : state?.from?.pathname;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId && status === 'IDLE') {
      dispatch(getUser());
    }
  }, []);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = getValues();
    const response = await signIn(user);

    if (response === 'OK') {
      dispatch(getUser());
      navigate(pageFrom || ERoutes.START, { replace: true });
    }
  };

  return (
    <section className='login'>
      <Form
        title='Авторизация'
        handleSubmit={handleSubmit}
        button={{
          type: 'submit',
          title: 'Войти',
          disabled: !isValid,
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
            pattern: VALIDATION.login,
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
