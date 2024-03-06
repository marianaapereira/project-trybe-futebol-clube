import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import tokenValidation from '../middlewares/tokenValidationMiddleware';

const matchController = new MatchController();

const router = Router();

// rotas /matches

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

router.patch(
  '/:id/finish',
  tokenValidation,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  tokenValidation,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default router;
