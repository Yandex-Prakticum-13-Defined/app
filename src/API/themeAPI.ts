import { EDBRoutes } from '../utils/constants/routes';
import { server } from './API';

export const toggleTheme = async (): Promise<string> => {
  const response = await server.get(EDBRoutes.THEME);

  return response.data;
};
