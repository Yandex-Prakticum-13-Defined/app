import axios from 'axios';

export interface IRegisterData {
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  password?: string;
  phone: string;
}

export interface ISignInData {
  login: string;
  password: string;
}

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUserData {
  id?: any;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: BinaryData;
  password?: string;
}

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://ya-praktikum.tech/api/v2',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const logout = () => instance.post('auth/logout')
  .then((response) => response);

export const getUser = () => instance.get('auth/user')
  .then((response) => response);

export const signUp = (userData: IRegisterData) => instance.post('auth/signup', userData)
  .then((response) => response.data.id);

export const signIn = (signInData: ISignInData) => instance.post('/auth/signin', signInData)
  .then((response) => response);

export const getProfile = (id: number | null) => instance.get(`user/${id}`)
  .then((response) => response);

export const changeUserProfile = (userData: IUserData) => instance.put('user/profile', userData)
  .then((response) => response);

export const changeAvatar = (formData: any) => instance.put(
  'user/profile/avatar',
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)
  .then((response) => response);

export const changeUserPassword = (userData: IPassword) => instance.put('user/password', userData)
  .then((response) => response);

export const searchUser = (signInData: IUserData) => instance.post('user/search', signInData)
  .then((Responses) => Responses);
