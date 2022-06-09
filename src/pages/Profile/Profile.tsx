import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Profile.scss';
import { baseURL } from '../../API2/API';
import {
  changeAvatar, changePassword, changeProfile, IAvatar
} from '../../API2/profileAPI';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { VALIDATION } from '../../utils/constants/validation';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ERoutes } from '../../utils/constants/routes';
import mockProfilePicture from '../../images/mock-profile-picture.jpg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addUserData } from '../../store/slice/userSlice';
import { additionalUserData } from '../../utils/constants/additionalUserData';

const Profile = () => {
  const [isProfile, setIsProfile] = useState(true);
  const [isAvatar, setIsAvatar] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const user = useAppSelector((state) => state.user.data!);
  const dispatch = useAppDispatch();

  const {
    handleSubmit: handleProfileFormSubmit,
    formState: {
      isValid: isProfileFormValid,
      isDirty: isProfileFormDirty
    },
    control: profileFormControl,
    getValues: getProfileFormValues
  } = useForm({
    mode: 'onChange'
  });

  const {
    handleSubmit: handleAvatarFormSubmit,
    formState: {
      isValid: isAvatarFormValid,
      isDirty: isAvatarFormDirty
    },
    control: avatarFormControl,
    reset: resetAvatarForm
  } = useForm({
    mode: 'onChange'
  });

  const {
    handleSubmit: handlePasswordFormSubmit,
    formState: {
      isValid: isPasswordFormValid
    },
    control: passwordFormControl,
    getValues: getPasswordFormValues,
    reset: resetPasswordForm
  } = useForm({
    mode: 'onChange'
  });

  const onSubmitProfileForm = async () => {
    const { firstName, login, email } = getProfileFormValues();

    try {
      await changeProfile({
        first_name: firstName,
        login,
        email,
        ...additionalUserData
      });
      dispatch(addUserData({
        first_name: firstName,
        login,
        email,
        id: user.id,
        avatar: user.avatar
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitAvatarForm = async (data: any, event: any) => {
    const formData = new FormData();
    formData.append('avatar', event.target.avatar.files[0]);

    try {
      const response = await changeAvatar(formData as unknown as IAvatar);
      dispatch(addUserData({
        first_name: user.first_name,
        login: user.login,
        email: user.email,
        id: user.id,
        avatar: response.data.avatar
      }));
      resetAvatarForm();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitPasswordForm = async () => {
    const { oldPassword, newPassword } = getPasswordFormValues();

    try {
      await changePassword({ oldPassword, newPassword });
      resetPasswordForm();
    } catch (error) {
      console.log(error);
    }
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
            handleSubmit={handleProfileFormSubmit(onSubmitProfileForm)}
            button={{
              type: 'submit',
              title: 'Сохранить',
              disabled: !isProfileFormValid || !isProfileFormDirty
            }}
            linkTo={ERoutes.START}
            linkText='На главную'
          >
            <Input
              name='firstName'
              type='text'
              placeholder='Имя'
              value={user.first_name}
              control={profileFormControl}
              rules={{
                required: VALIDATION.required,
                pattern: VALIDATION.name
              }}
            />
            <Input
              name='login'
              type='text'
              placeholder='Логин'
              value={user.login}
              control={profileFormControl}
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
              value={user.email}
              control={profileFormControl}
              rules={{
                required: VALIDATION.required,
                pattern: VALIDATION.email
              }}
            />
          </Form>
        )}
        {isAvatar && (
          <>
            <img
              className='profile__picture'
              src={user.avatar ? `${baseURL}/resources${user.avatar}` : mockProfilePicture}
              alt='Аватар пользователя'
            />
            <Form
              title='Загрузить аватар'
              handleSubmit={handleAvatarFormSubmit(onSubmitAvatarForm)}
              button={{
                type: 'submit',
                title: 'Сохранить',
                disabled: !isAvatarFormValid || !isAvatarFormDirty
              }}
              linkTo={ERoutes.START}
              linkText='На главную'
            >
              <Input
                name='avatar'
                type='file'
                control={avatarFormControl}
              />
            </Form>
          </>
        )}
        {isPassword && (
          <Form
            title='Изменить пароль'
            handleSubmit={handlePasswordFormSubmit(onSubmitPasswordForm)}
            button={{
              type: 'submit',
              title: 'Сохранить',
              disabled: !isPasswordFormValid
            }}
            linkTo={ERoutes.START}
            linkText='На главную'
          >
            <Input
              name='oldPassword'
              type='password'
              placeholder='Введите старый пароль'
              control={passwordFormControl}
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
              control={passwordFormControl}
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
