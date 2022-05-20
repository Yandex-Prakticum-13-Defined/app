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

export const signUp = async (userData: IRegisterData): Promise<IUserResponse> => {
  const response = await instance.post('auth/signup', userData);

  return response.data;
};

export const signIn = async (signInData: ILoginData): Promise<string> => {
  const response = await instance.post('/auth/signin', signInData);

  return response.data;
};

export const getUser = async (): Promise<IUserResponse> => {
  const response = await instance.get('auth/user');

  return response.data;
};

export const logOut = async (): Promise<string> => {
  const response = await instance.post('auth/logout');

  return response.data;
};

export const changeProfile = async (profileData: IProfile): Promise<IUserResponse> => {
  const response = await instance.put('user/profile', profileData);

  return response.data;
};

export const changeAvatar = async (formData: IAvatar): Promise<IUserResponse> => {
  const response = await instance.put(
    'user/profile/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return response.data;
};

export const changePassword = async (passwordData: IPassword): Promise<IUserResponse> => {
  const response = await instance.put('user/password', passwordData);

  return response.data;
};
