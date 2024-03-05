import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { NewEntity } from '../Interfaces';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async create(data: NewEntity<ITeam>): Promise<ITeam> {
    const dbData = await this.model.create(data);
    const { id, teamName }: ITeam = dbData;

    return { id, teamName };
  }

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();

    return dbData.map(
      ({ id, teamName }) => ({ id, teamName }),
    );
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);

    if (dbData == null) return null;

    const { teamName }: ITeam = dbData;

    return { id, teamName };
  }

  async getMatchTeamsNames(
    homeTeamId: ITeam[ 'id' ],
    awayTeamId: ITeam[ 'id' ],
  ): Promise<object> {
    const homeTeam = await this.findById(homeTeamId);
    const awayTeam = await this.findById(awayTeamId);

    return {
      homeTeam: {
        teamName: homeTeam?.teamName,
      },
      awayTeam: {
        teamName: awayTeam?.teamName,
      },
    };
  }
}
