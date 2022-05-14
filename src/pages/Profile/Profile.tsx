import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Profile.scss';
import {
  changeAvatar, changeUserPassword, changeUserProfile, getProfile
} from '../../api/api';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hook/useAuth';
import { VALIDATION } from '../../utils/constants/validation';
import { ERoutes } from '../../utils/constants/routes';

const Profile = () => {
  const { user } = useAuth();

  const [isProfile, setIsProfile] = useState(true);
  const [isAvatar, setIsAvatar] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const {
    handleSubmit,
    formState: {
      isValid
    },
    control,
    setValue,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      first_name: '',
      login: '',
      email: '',
      password: '',
      avatar: '',
      oldPassword: '',
      newPassword: ''
    }
  });

  const [profile, setProfile] = useState({
    first_name: '',
    login: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    getProfile(Number(user?.id))
      .then(({ data }) => {
        setProfile(data);
      });
  }, [user]);

  useEffect(() => {
    setValue('username', profile?.first_name);
    setValue('login', profile?.login);
    setValue('email', profile?.email);
  }, [profile]);

  const onSubmitProfile = async () => {
    const {
      username,
      login,
      email
    } = getValues();

    await changeUserProfile({
      first_name: username,
      login,
      email,
      second_name: 'Second',
      display_name: 'Display',
      phone: '+7-000-000-00-00'
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitAvatar = async (data: any, event: any) => {
    const formData = new FormData();
    formData.append('avatar', event.target.avatar.files[0]);
    await changeAvatar(formData);
  };

  const onSubmitPassword = async () => {
    const { oldPassword, newPassword } = getValues();
    await changeUserPassword({ oldPassword, newPassword });
  };

  return (
    <section className='profile'>
      <div className='profile__container'>
        <Button
          title='Редактировать профиль'
          onClick={() => {
            setIsAvatar(false);
            setIsProfile(true);
            setIsPassword(false);
          }}
          type='button'
          disabled={isProfile}
        />
        <Button
          title='Загрузить аватар'
          onClick={() => {
            setIsAvatar(true);
            setIsProfile(false);
            setIsPassword(false);
          }}
          type='button'
          disabled={isAvatar}
        />
        <Button
          title='Изменить пароль'
          onClick={() => {
            setIsPassword(true);
            setIsAvatar(false);
            setIsProfile(false);
          }}
          type='button'
          disabled={isPassword}
        />
        {isProfile && (
          <Form
            title='Редактировать профиль'
            handleSubmit={handleSubmit(onSubmitProfile)}
            button={{
              type: 'submit',
              title: 'Сохранить',
              disabled: !isValid
            }}
            linkTo={ERoutes.START}
            linkText='На главную'
          >
            <Input
              name='username'
              type='text'
              placeholder='Имя'
              value={profile?.first_name}
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
              value={profile?.login}
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
              value={profile?.email}
              control={control}
              rules={{
                required: VALIDATION.required,
                pattern: VALIDATION.email
              }}
            />
          </Form>
        )}
        {isAvatar && (
          <Form
            title='Загрузить аватар'
            handleSubmit={handleSubmit(onSubmitAvatar)}
            button={{
              type: 'submit',
              title: 'Сохранить',
              disabled: !isValid
            }}
            linkTo={ERoutes.START}
            linkText='На главную'
          >
            <Input
              name='avatar'
              type='file'
              placeholder='Выберите аватар'
              control={control}
            />
          </Form>
        )}
        {isPassword && (
          <Form
            title='Изменить пароль'
            handleSubmit={handleSubmit(onSubmitPassword)}
            button={{
              type: 'submit',
              title: 'Сохранить',
              disabled: !isValid
            }}
            linkTo={ERoutes.START}
            linkText='На главную'
          >
            <Input
              name='oldPassword'
              type='password'
              placeholder='Введите старый пароль'
              control={control}
              rules={{
                required: VALIDATION.required,
                pattern: VALIDATION.password,
                minLength: VALIDATION.minLength_8
              }}
            />
            <Input
              name='newPassword'
              type='password'
              placeholder='Введите новый пароль'
              control={control}
              rules={{
                required: VALIDATION.required,
                pattern: VALIDATION.password,
                minLength: VALIDATION.minLength_8
              }}
            />
          </Form>
        )}
      </div>
    </section>
  );
};

export default Profile;
