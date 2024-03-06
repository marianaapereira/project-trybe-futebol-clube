import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { HTTP_CREATED_STATUS, HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchService.createMatch(req.body);
    res.status(HTTP_CREATED_STATUS).json(serviceResponse.data);
  }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const serviceResponse = await this.matchService.getInProgressMatches();
      return res.status(HTTP_OK_STATUS).json(serviceResponse.data);
    }

    if (inProgress === 'false') {
      const serviceResponse = await this.matchService.getFinishedMatches();
      return res.status(HTTP_OK_STATUS).json(serviceResponse.data);
    }

    const serviceResponse = await this.matchService.getAllMatches();
    res.status(HTTP_OK_STATUS).json(serviceResponse.data);
  }

  public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.getMatchById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(HTTP_OK_STATUS).json(serviceResponse.data);
  }
}
