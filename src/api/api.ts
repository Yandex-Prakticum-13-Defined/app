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
  avatar?: string;
}

const API_URL = '/api/v2';

export const postLogout = () => axios.post(`${API_URL}/auth/logout`)
  .then((response) => response);

export const getUser = () => axios.get(`${API_URL}/auth/user`)
  .then((responses) => responses);

export const postUser = (userData: IRegisterData) => axios.post(`${API_URL}/auth/signup`, userData)
  .then((response) => response.data.id);

export const postSignIn = (signInData: ISignInData) => axios.post(`${API_URL}/auth/signin`, signInData)
  .then((response) => response);

export const getProfile = (id: any) => axios.get(`${API_URL}/user/${id}`, id)
  .then((response) => response);

export const changeUserProfile = (userData: IUserData) => axios.put(`${API_URL}/user/profile`, userData)
  .then((response) => response);

export const changeAvatar = (userData: any) => axios.put(
  `${API_URL}/user/profile/avatar`,
  userData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)
  .then((response) => response);

export const changeUserPassword = (userData: IPassword) => axios.put(`${API_URL}/user/password`, userData)
  .then((response) => response);

export const postSearchUser = (signInData: IUserData) => axios.post(
  `${API_URL}/user/search`,
  signInData
).then((Responses) => Responses);
