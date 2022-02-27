import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
  id: string;
  iat: number;
  exp: number;
}

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
      return res.status(401).json('Acess denied');
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    const payload = jwt.verify(
      bearerToken,
      process.env.TOKEN_SECRET || 'tokentest'
    ) as IPayload;

    req.userId = payload.id;

    next();
  } catch (e) {
    return res.status(401).json('Token invalid');
  }
};
