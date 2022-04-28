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

export interface IUserData {
  id: number;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

const API_URL = 'https://ya-praktikum.tech/api/v2';

export const postLogout = () => axios.post(`${API_URL}/auth/logout`)
  .then((responses) => responses);

export const getUser = () => axios.get(`${API_URL}/auth/user`)
  .then((responses) => responses);

export const postUser = (userData: IRegisterData) => axios.post(`${API_URL}/auth/signup`, userData)
  .then((response) => response.data.id);
// .catch((error) => { console.log(error.reason || error.message); });

export const postSignIn = (signInData: ISignInData) => axios.post(`${API_URL}/auth/signin`, signInData)
  .then((response) => response);

export const postProfile = (UserData: any) => axios.post(`${API_URL}/user/search`, UserData)
  .then((response) => response);

export const getProfile = (id: any) => axios.post(`${API_URL}/user/${id}`, { id })
  .then((response) => response);

// export const getUser = () => axios.post(`${API_URL}/user`)
//   .then((response) => response);

export const changeUserProfile = (userData: any) => axios.put(`${API_URL}/user/profile`, userData)
  .then((response) => response);

// запрос профиля
export const postSearchUser = (signInData: any) => axios.post(`${API_URL}/user/search`, signInData)
  .then((Responses) => Responses);
