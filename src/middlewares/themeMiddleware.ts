import { NextFunction, Request, Response } from 'express';

export const themeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.theme === undefined) {
    res.cookie('theme', 'light');
    res.locals.theme = 'light';
  }

  next();
};
