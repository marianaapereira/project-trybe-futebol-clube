import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import { HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  // public async getAllTeamsLeaderboard(_req: Request, res: Response) {
  //   const serviceResponse = await this.leaderboardService.getAllTeamsLeaderboard();
  //   res.status(HTTP_OK_STATUS).json(serviceResponse.data);
  // }

  public async getHomeTeamsLeaderboard(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getHomeTeamsLeaderboard();
    res.status(HTTP_OK_STATUS).json(serviceResponse.data);
  }

  public async getAwayTeamsLeaderboard(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getAwayTeamsLeaderboard();
    res.status(HTTP_OK_STATUS).json(serviceResponse.data);
  }
}
