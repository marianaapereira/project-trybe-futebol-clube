import { Request, Response, NextFunction } from 'express';
import { HTTP_UNAUTHORIZED_STATUS } from '../consts/httpStatusCodes.consts';
import jwtUtil from '../utils/jwt.util';
import extractToken from '../utils/extractToken';

function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token not found' });
  }

  const token = extractToken(authorization);

  try {
    const validUser = jwtUtil.verify(token);
    res.locals.auth = validUser;
  } catch (error) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token must be a valid token' });
  }

  next();
}

export default tokenValidation;
