import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Profile.scss';
import {
  changeAvatar, changeUserPassword, changeUserProfile, getUser, IUserData
} from '../../api/api';
import { ERoutes } from '../../App';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { VALIDATION } from '../../utils/constants/validation';
import { useAppSelector } from '../../hook/useAppSelector';

const Profile = () => {
  const [isProfile, setIsProfile] = useState(true);
  const [isAvatar, setIsAvatar] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [curFile, setCurFile] = useState();
  const [avatarName, setAvatarName] = useState('');
  const userId = useAppSelector((state) => state.user.data.id);

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

  const [profile, setProfile] = useState<IUserData>({
    first_name: '',
    login: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    getUser()
      .then((data) => {
        setProfile(data);
      });
  }, [userId]);

  useEffect(() => {
    setValue('username', profile?.first_name || '');
    setValue('login', profile?.login || '');
    setValue('email', profile?.email || '');
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
            handleSubmit={handleSubmit(onSubmit)}
            button={{
              type: 'submit',
              title: 'Сохранить',
              disabled: !isValid,
            }}
            linkTo={ERoutes.START}
            linkText='На главную'
          >
            <Input
              name='username'
              type='text'
              placeholder='Имя'
              defaultValue={profile?.first_name}
              control={control}
              rules={{
                required: VALIDATION.required,
                pattern: VALIDATION.name,
              }}
            />
            <Input
              name='login'
              type='text'
              placeholder='Логин'
              defaultValue={profile?.login}
              control={control}
              rules={{
                required: VALIDATION.required,
                minLength: VALIDATION.minLength_3,
                maxLength: VALIDATION.maxLength_20,
                pattern: VALIDATION.login,
              }}
            />
            <Input
              name='email'
              type='email'
              placeholder='Email'
              defaultValue={profile?.email}
              control={control}
              rules={{
                required: VALIDATION.required,
                pattern: VALIDATION.email,
              }}
            />
          </Form>
        )}
        {isAvatar && (
          <Form
            title='Загрузить аватар'
            handleSubmit={handleSubmit(uploadAvatar)}
            button={{
              type: 'submit',
              title: 'Сохранить',
              disabled: !isValid,
            }}
            linkTo={ERoutes.START}
            linkText='На главную'
          >
            <Input
              name='avatar'
              type='file'
              placeholder='Выберите аватар'
              control={control}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => {
                setCurFile(e?.target?.files[0]);
                setAvatarName(e.target.value);
              }}
              value={avatarName}
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
              disabled: !isValid,
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
