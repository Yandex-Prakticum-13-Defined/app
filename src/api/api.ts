import axios from 'axios';

export interface IRegisterData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface IUserResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

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

export const baseURL = 'https://ya-praktikum.tech/api/v2';

export const instance = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const signUp = (userData: IRegisterData) => instance.post('auth/signup', userData);

export const signIn = (signInData: ILoginData) => instance.post('/auth/signin', signInData);

export const getUser = async (): Promise<IUserResponse> => {
  const response = await instance.get('auth/user');

  return response.data;
};

export const logOut = () => instance.post('auth/logout');

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
