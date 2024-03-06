import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';
import { NewEntity } from '../Interfaces';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async createTeam(team: NewEntity<ITeam>): Promise<ServiceResponse<ITeam>> {
    const newTeam = await this.teamModel.create(team);

    return { status: 'SUCCESSFUL', data: newTeam };
  }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);

    if (!team) return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };

    return { status: 'SUCCESSFUL', data: team };
  }
}
