import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

async function login(req: Request, res: Response) {
  const serviceResponse = await LoginService.verifyLogin(req.body);

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  res.status(HTTP_OK_STATUS).json(serviceResponse.data);
  res.redirect('/matches');
}

export default {
  login,
};
