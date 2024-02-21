import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import tokenValidation from '../middlewares/tokenValidationMiddleware';

const loginController = new LoginController();

const router = Router();

// rotas /login

router.post(
  '/',
  (req: Request, res: Response) => LoginController.login(req, res),
);

router.get(
  '/role',
  tokenValidation,
  (req: Request, res: Response) => loginController.getUserRole(req, res),
);

export default router;
