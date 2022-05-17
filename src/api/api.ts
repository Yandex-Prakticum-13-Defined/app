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
  id?: number;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: BinaryData;
  password?: string;
}

export const baseURL = 'https://ya-praktikum.tech/api/v2';

export const instance = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const logOut = async (): Promise<string> => {
  const response = await instance.post('auth/logout');

  return response.data;
};

export const getUser = async (): Promise<IUserData> => {
  const response = await instance.get('auth/user');

  return response.data;
};

export const signUp = (userData: IRegisterData) => instance.post('auth/signup', userData)
  .then((response) => response.data.id);

export const signIn = (signInData: ISignInData): Promise<string> => instance.post('/auth/signin', signInData)
  .then((response) => response.data);

export const changeUserProfile = (userData: IUserData) => instance.put('user/profile', userData)
  .then((response) => response);

export const changeAvatar = (formData: FormData) => instance.put(
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
