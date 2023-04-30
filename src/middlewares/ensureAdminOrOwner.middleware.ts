import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import createError from 'http-errors';

const ensureAdminOrOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idUser = req.user.id;
  const isAdm = req.user.adm;
  const { id } = req.params;

  if (!isAdm && id !== idUser) {
    throw createError.Forbidden('O usuário com acesso restrito');
  }

  return next();
};

export default ensureAdminOrOwner;