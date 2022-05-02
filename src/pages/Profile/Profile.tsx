import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import './Profile.scss';

import {
  changeAvatar, changeUserPassword, changeUserProfile, getProfile
} from '../../api/api';

import { ERoutes } from '../../App';
import Form from '../../components/Form/Form';
import { FormInput } from '../../components/Form/FormInput';
import { PATTERN_VALIDATION } from '../../utils/Const';

const Profile = () => {
  const { id } = localStorage;
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
    getProfile(Number(id))
      .then(({ data }) => {
        setProfile(data);
      });
  }, [id]);

  useEffect(() => {
    // @ts-ignore
    setValue('username', profile?.first_name);
    // @ts-ignore
    setValue('login', profile?.login);
    // @ts-ignore
    setValue('email', profile?.email);
  }, [profile]);

  const onSubmit = () => {
    // @ts-ignore
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
      <Link className='register' onClick={() => {
        setIsAvatar(false);
        setIsProfile(true);
        setIsPassword(false);
      }} to='#'>Редактировать профиль</Link>
      {isProfile && (
        <Form
        title='Профиль'
        handleSubmit={handleSubmit(onSubmit)}
        children={(
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
          </>
        )}
        button={{
          type: 'submit',
          title: 'Сохранить',
          disabled: !isValid,
        }}
      />
      )}
      <Link className='register' onClick={() => {
        setIsAvatar(true);
        setIsProfile(false);
        setIsPassword(false);
      }} to='#'>Загрузить аватар</Link>
      {isAvatar && (
        <Form title='Загрузить аватар'
              handleSubmit={handleSubmit(uploadAvatar)}

              children={(
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
                </>
              )}
              button={{
                type: 'submit',
                title: 'Сохранить',
                disabled: !isValid,
              }}/>
      )}
      <Link className='register' onClick={() => {
        setIsPassword(true);
        setIsAvatar(false);
        setIsProfile(false);
      }} to='#'>Изменить пароль</Link>
      {isPassword && (
        <Form title='Изменить пароль'
              handleSubmit={handleSubmit(onSubmitPassword)}
              children={(
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
                </>
              )}
              button={{
                type: 'submit',
                title: 'Сохранить',
                disabled: !isValid,
              }}/>
      )}
      <Link className='register' to={ERoutes.START}>На главную</Link>
    </div>
  );
};

export default Profile;
