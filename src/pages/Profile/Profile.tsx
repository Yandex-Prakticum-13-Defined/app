import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import './Profile.scss';

import {
  changeAvatar, changeUserPassword, changeUserProfile, getProfile
} from '../../api/api';

import { ERoutes } from '../../App';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import { FormInput } from '../../components/FormInput/FormInput';
import Spacer from '../../components/Spacer/Spacer';
import { useAuth } from '../../hook/useAuth';
import { PATTERN_VALIDATION } from '../../utils/Const';

const Profile = () => {
  const { user } = useAuth();

  const [isProfile, setIsProfile] = useState(false);
  const [isAvatar, setIsAvatar] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [curFile, setCurFile] = useState();
  const [avatarName, setAvatarName] = useState('');

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
    },
  });

  const [profile, setProfile] = useState({
    first_name: '',
    login: '',
    email: '',
    password: '',
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

  const onSubmit = () => {
    const {
      username,
      login,
      email
    } = getValues();

    changeUserProfile({
      first_name: username,
      login,
      email,
      second_name: 'Second',
      display_name: 'Display',
      phone: '+7-000-000-00-00',
    })
      .then();
  };

  const uploadAvatar = () => {
    if (curFile) {
      const formData = new FormData();
      formData.append('avatar', curFile);
      changeAvatar(formData)
        .then();
    }
  };

  const onSubmitPassword = () => {
    const {
      oldPassword,
      newPassword
    } = getValues();
    changeUserPassword({
      oldPassword,
      newPassword
    })
      .then();
  };

  return (
    <div className='container'>
      <Button
        title='Редактировать профиль'
        className='profile__button'
        onClick={() => {
          setIsAvatar(false);
          setIsProfile(true);
          setIsPassword(false);
        }}/>
      {isProfile && (
        <Form
          title='Профиль'
          handleSubmit={handleSubmit(onSubmit)}
          button={{
            type: 'submit',
            title: 'Сохранить',
            disabled: !isValid,
          }}
        >
          <>
            <FormInput
              name='username'
              type='text'
              placeholder='Имя'
              className='form__input'
              defaultValue={profile?.first_name}
              control={control}
              rules={{
                required: PATTERN_VALIDATION.required,
                pattern: PATTERN_VALIDATION.name,
              }}
            />
            <Spacer className='spacer spacer__height'/>
            <FormInput
              name='login'
              type='text'
              placeholder='Логин'
              className='form__input'
              defaultValue={profile?.login}
              control={control}
              rules={{
                required: PATTERN_VALIDATION.required,
                minLength: PATTERN_VALIDATION.minLength_3,
                maxLength: PATTERN_VALIDATION.maxLength,
                pattern: PATTERN_VALIDATION.login,
              }}
            />
            <Spacer className='spacer spacer__height'/>
            <FormInput
              name='email'
              type='email'
              placeholder='email адрес'
              className='form__input'
              defaultValue={profile?.email}
              control={control}
              rules={{
                required: PATTERN_VALIDATION.required,
                pattern: PATTERN_VALIDATION.email,
              }}
            />
            <Spacer className='spacer spacer__height'/>
          </>
        </Form>
      )}
      <Button
        title='Загрузить аватар'
        className='profile__button' onClick={() => {
          setIsAvatar(true);
          setIsProfile(false);
          setIsPassword(false);
        }}/>
      {isAvatar && (
        <Form title='Загрузить аватар'
              handleSubmit={handleSubmit(uploadAvatar)}
              button={{
                type: 'submit',
                title: 'Сохранить',
                disabled: !isValid,
              }}>
          <>
            <FormInput
              name='avatar'
              type='file'
              placeholder='выберете аватар'
              className='form__input'
              control={control}
              onChange={(e: any) => {
                setCurFile(e?.target?.files[0]);
                setAvatarName(e.target.value);
              }}
              value={avatarName}
            />
            <Spacer className='spacer spacer__height'/>
          </>
        </Form>
      )}
      <Button
        title='Изменить пароль'
        className='profile__button'
         onClick={() => {
           setIsPassword(true);
           setIsAvatar(false);
           setIsProfile(false);
         }} />
      {isPassword && (
        <Form title='Изменить пароль'
              handleSubmit={handleSubmit(onSubmitPassword)}
              button={{
                type: 'submit',
                title: 'Сохранить',
                disabled: !isValid,
              }}>
          <>
            <FormInput
              name='oldPassword'
              type='password'
              placeholder='введите старый пароль'
              className='form__input'
              control={control}
              rules={{
                required: PATTERN_VALIDATION.required,
                pattern: PATTERN_VALIDATION.password,
                minLength: PATTERN_VALIDATION.minLength_8
              }}
            />
            <Spacer className='spacer spacer__height'/>
            <FormInput
              name='newPassword'
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
            <Spacer className='spacer spacer__height'/>
          </>
        </Form>
      )}
      <Link className='register' to={ERoutes.START}>На главную</Link>
    </div>
  );
};

export default Profile;
