import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import createError from 'http-errors';

const ensureAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    let token = req.headers.authorization;
    console.log(token)
    if (!token) {
        throw createError.Unauthorized('Token de autorização não encontrado');
        
    }

    
    token = token.split(' ')[1];
    

    jwt.verify(token, String(process.env.SECRET_KEY), (error, decoded: any) => {
        if (error) throw createError.Unauthorized('Token inválido');

        req.user = {
            id: decoded.id,
            email: decoded.email,
            adm: decoded.adm,
        };

        return next();
    });
};

export default ensureAuthMiddleware;