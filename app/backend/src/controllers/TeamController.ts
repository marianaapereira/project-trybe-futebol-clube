import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { HTTP_CREATED_STATUS, HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async createTeam(req: Request, res: Response) {
    const serviceResponse = await this.teamService.createTeam(req.body);
    res.status(HTTP_CREATED_STATUS).json(serviceResponse.data);
  }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();

    res.status(HTTP_OK_STATUS).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.getTeamById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(HTTP_OK_STATUS).json(serviceResponse.data);
  }
}
