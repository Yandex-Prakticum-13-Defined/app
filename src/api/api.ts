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

const apiURL = 'https://ya-praktikum.tech/api/v2';

export const postUser = (userData: IRegisterData) => axios.post(`${apiURL}/auth/signup`, userData)
  .then((response) => response.data.id);
  // .catch((error) => { console.log(error.reason || error.message); });

export const postSignIn = (signInrData: ISignInData) => axios.post(`${apiURL}/auth/signin`, signInrData)
  .then((response) => response);
// .catch((error) => { console.log(error.reason || error.message); });
