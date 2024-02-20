import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';

const router = Router();

// rotas /login

router.post(
  '/',
  (req: Request, res: Response) => LoginController.login(req, res),
);

export default router;
