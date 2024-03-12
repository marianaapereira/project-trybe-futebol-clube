import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import MatchService from './MatchService';

import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';
import TeamService from './TeamService';

import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private matchService = new MatchService(),
    private teamModel: ITeamModel = new TeamModel(),
    private teamService = new TeamService(),
  ) { }

  // name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn
  // "goalsBalance": 12,
  // "efficiency": "86.67"

  public async getAllTeamsLeaderboard(): Promise<ServiceResponse<object[]>> {
    const allTeams = await this.teamModel.findAll();
    // const allMatches = await this.matchModel.findAll();

    // const allTeamsMatchesData = allTeams.map((team, index) => {
    //   if (team.id === allMatches[index].)
    // })

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getHomeTeamsLeaderboard(): Promise<ServiceResponse<object[]>> {
    const homeTeams = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data: homeTeams };
  }

  public async getAwayTeamsLeaderboard(): Promise<ServiceResponse<object[]>> {
    const awayTeams = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data: awayTeams };
  }
}
