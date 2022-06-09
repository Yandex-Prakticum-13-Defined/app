import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { baseURL } from '../API2/API';
import { ERoutes } from '../utils/constants/routes';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let user = null;

  if (req.headers.cookie) {
    try {
      const { data } = await axios.get(`${baseURL}/auth/user`, {
        headers: { Cookie: req.headers.cookie }
      });
      user = data;

      res.locals.user = user;
    } catch (error) {
      console.log(error);
    }
  }

  if (user === null && ![ERoutes.LOGIN, ERoutes.REGISTER, ERoutes.START].includes(req.url as ERoutes)) {
    res.redirect(ERoutes.LOGIN);

    return;
  }

  if (user && [ERoutes.LOGIN, ERoutes.REGISTER].includes(req.url as ERoutes)) {
    res.redirect(ERoutes.START);

    return;
  }

  next();
};
