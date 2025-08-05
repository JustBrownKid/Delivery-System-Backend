import * as jwt from 'jsonwebtoken';
import 'ms';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../../config/app';

interface TokenPayload {
 name:string,
 email:string
}

export function generateToken(payload: TokenPayload): string {
  const secret: jwt.Secret = JWT_SECRET;

  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string): TokenPayload {
  const secret: jwt.Secret = JWT_SECRET;
  return jwt.verify(token, secret) as TokenPayload;
}