import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { NewEntity } from '../Interfaces';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async createMatch(team: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const newMatch = await this.matchModel.create(team);

    return { status: 'SUCCESSFUL', data: newMatch };
  }

  public async getMatchById(id: number): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.findById(id);

    if (!match) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };

    return { status: 'SUCCESSFUL', data: match };
  }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getInProgressMatches(): Promise<ServiceResponse<IMatch[]>> {
    const inProgressMatches = await this.matchModel.findAllInProgress(true);

    return { status: 'SUCCESSFUL', data: inProgressMatches };
  }

  public async getFinishedMatches(): Promise<ServiceResponse<IMatch[]>> {
    const finishedMatches = await this.matchModel.findAllInProgress(false);

    return { status: 'SUCCESSFUL', data: finishedMatches };
  }
}
