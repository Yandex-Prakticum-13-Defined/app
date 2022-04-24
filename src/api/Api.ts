export interface IRegisterData {
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  password?: string;
  phone: string;
}

// interface IApiData {
//   baseUrl: string
// }
const apiURL = 'https://ya-praktikum.tech/api/v2'

// const getResponseData = (res: Record<string, string>): Promise<string> => {
// const getResponseData = (res: any): Promise<string> => {
//   if (!res.ok) {
//     return Promise.reject(`Ошибка: ${res.status}`);
//   }
//   return res.json();
// }

const postUser = async (userData: IRegisterData) => {
  try {
    return await fetch(`${apiURL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userData)
    });
  } catch (e: unknown) {
    throw new Error(String(e))
  }

}

export default postUser
