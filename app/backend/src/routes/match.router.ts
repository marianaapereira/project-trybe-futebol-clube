import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import tokenValidation from '../middlewares/tokenValidationMiddleware';
import newMatchValidation from '../middlewares/newMatchValidationMiddleware';

const matchController = new MatchController();

const router = Router();

// rotas /matches

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => matchController.getMatchById(req, res),
);

router.post(
  '/',
  tokenValidation,
  newMatchValidation,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

router.patch(
  '/:id',
  tokenValidation,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.patch(
  '/:id/finish',
  tokenValidation,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
