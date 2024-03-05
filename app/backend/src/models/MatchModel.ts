import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces';

export default class TeamModel implements IMatchModel {
  private model = SequelizeMatch;

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const dbData = await this.model.create(data);
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;

    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll();

    return dbData.map(
      ({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => ({
        id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress,
      }),
    );
  }

  async findById(id: IMatch[ 'id' ]): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);

    if (dbData == null) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;

    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
