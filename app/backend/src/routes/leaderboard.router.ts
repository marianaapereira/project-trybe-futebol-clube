import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

// rotas /leaderboard

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getAllTeamsLeaderboard(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeTeamsLeaderboard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getAwayTeamsLeaderboard(req, res),
);

export default router;
