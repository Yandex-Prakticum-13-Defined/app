import { instance } from './API';

interface IOAuthData {
  code: string;
  redirect_uri: string;
}

export const redirectUri = process.env.ENVIRONMENT === 'DEV'
  ? 'https://localhost:8080'
  : 'https://defined-arkanoid-13.ya-praktikum.tech/';
export const appURL = 'https://local.ya-praktikum.tech:8080';

export const getServiceId = async (): Promise<{ service_id: string; }> => {
  const response = await instance.get(`/oauth/yandex/service-id?redirect_uri=${redirectUri}`);

  return response.data;
};

export const signInWithYandex = async (OAuthData: IOAuthData): Promise<string> => {
  const response = await instance.post('/oauth/yandex', OAuthData);

  return response.data;
};
