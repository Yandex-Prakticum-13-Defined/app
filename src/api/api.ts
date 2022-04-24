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

const apiURL = 'https://ya-praktikum.tech/api/v2';

export const postUser = (userData: IRegisterData) => axios.post(`${apiURL}/auth/signup`, userData)
  .then((response) => response.data.id);
  // .catch((error) => { console.log(error.reason || error.message); });
