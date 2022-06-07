import { instance } from './API';

export interface IProfile {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IAvatar {
  avatar: BinaryData;
}

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

export const changeProfile = (profileData: IProfile) => instance.put('user/profile', profileData);

export const changeAvatar = (formData: IAvatar) => instance.put(
  'user/profile/avatar',
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
);

export const changePassword = (passwordData: IPassword) => instance.put('user/password', passwordData);
