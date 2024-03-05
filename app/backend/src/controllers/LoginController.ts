import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

export default class LoginController {
  constructor(
    private userService = new UserService(),
  ) { }

  public static async login(req: Request, res: Response) {
    const serviceResponse = await LoginService.verifyLogin(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(HTTP_OK_STATUS).json(serviceResponse.data);
    res.redirect('/matches');
  }

  public async getUserRole(_req: Request, res: Response) {
    try {
      const user = res.locals.auth;
      const serviceResponse = await this.userService.getUserById(Number(user.id));

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
      }

      const { role } = serviceResponse.data;

      res.status(HTTP_OK_STATUS).json({ role });
    } catch (error) {
      res.status(HTTP_OK_STATUS).json(error);
    }
  }
}
