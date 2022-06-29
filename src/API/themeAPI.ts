import { serverRoutes } from '../utils/constants/routes';
import { server } from './API';

export const toggleTheme = async (userId: string): Promise<string> => {
  const response = await server.post(serverRoutes.THEME, { userId });

  return response.data;
};
