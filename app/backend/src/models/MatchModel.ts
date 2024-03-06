// import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces';
import TeamModel from './TeamModel';

export default class MatchModel implements IMatchModel {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  private model = SequelizeMatch;

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const dbData = await this.model.create(data);
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;

    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll();

    const promises = dbData.map(async (match) => {
      const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = match;
      const matchTeamsNames = await this.teamModel.getMatchTeamsNames(homeTeamId, awayTeamId);

      return {
        id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, ...matchTeamsNames,
      };
    });

    const matchesWithTeamsNames = await Promise.all(promises);

    return matchesWithTeamsNames;
  }

  public async findAllInProgress(inProgress: IMatch[ 'inProgress' ]): Promise<IMatch[]> {
    const allMatches = await this.findAll();

    const filteredMatches = allMatches.filter(
      (match) => Boolean(match.inProgress) === Boolean(inProgress),
    );

    return filteredMatches;
  }

  async findById(id: IMatch[ 'id' ]): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);

    if (dbData == null) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;

    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
