import { instance } from './API';

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

export const signUp = (userData: IRegisterData) => instance.post('auth/signup', userData);

export const signIn = (signInData: ILoginData) => instance.post('/auth/signin', signInData);

export const getUser = async (): Promise<IUserResponse> => {
  const response = await instance.get('auth/user');

  return response.data;
};

export const logOut = () => instance.post('auth/logout');

export const getUserById = async (id: number): Promise<IUserResponse> => {
  const response = await instance.get(`user/${id}`);

  return response.data;
};

export const getUserByIdSSR = async (id: number, cookie: string): Promise<IUserResponse> => {
  const response = await instance.get(`user/${id}`, {
    headers: { Cookie: cookie }
  });

  return response.data;
};
