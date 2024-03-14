import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchService from './MatchService';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';
import leaderboardUtils from '../utils/leaderboardUtils';

export default class LeaderboardService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchService = new MatchService(),
  ) { }

  // public async getFinishedTeamMatches(teamId: number): Promise<IMatch[]> {
  //   const allFinishedMatches = await this.matchService.getFinishedMatches();

  //   if (allFinishedMatches.status === 'SUCCESSFUL') {
  //     const teamMatches = allFinishedMatches.data
  //       .filter((match: IMatch) => (
  //         (match.homeTeamId === teamId) || (match.awayTeamId === teamId)
  //       ));

  //     return teamMatches;
  //   }

  //   return [];
  // }

  // public async getAllTeamsLeaderboard(): Promise<ServiceResponse<object[]>> {
  //   const allTeams = await this.teamModel.findAll();

  //   const promises = allTeams.map(async (team) => {
  //     const teamMatches = await this.getFinishedTeamMatches(team.id);
  //     const teamLeaderboard = leaderboardUtils.getTeamLeaderboard(team, teamMatches);

  //     return teamLeaderboard;
  //   });

  //   const allTeamsLeaderboard = await Promise.all(promises);
  //   const sortedLeaderboard = leaderboardUtils.sortLeaderboard(allTeamsLeaderboard);

  //   return { status: 'SUCCESSFUL', data: sortedLeaderboard };
  // }

  public async getFinishedHomeTeamMatches(teamId: number): Promise<IMatch[]> {
    const allFinishedMatches = await this.matchService.getFinishedMatches();

    if (allFinishedMatches.status === 'SUCCESSFUL') {
      const teamMatches = allFinishedMatches.data
        .filter((match: IMatch) => match.homeTeamId === teamId);

      return teamMatches;
    }

    return [];
  }

  public async getHomeTeamsLeaderboard(): Promise<ServiceResponse<object[]>> {
    const allTeams = await this.teamModel.findAll();

    const promises = allTeams.map(async (team) => {
      const teamMatches = await this.getFinishedHomeTeamMatches(team.id);
      const teamLeaderboard = leaderboardUtils.getTeamLeaderboard(team, teamMatches);

      return teamLeaderboard;
    });

    const allTeamsLeaderboard = await Promise.all(promises);
    const sortedLeaderboard = leaderboardUtils.sortLeaderboard(allTeamsLeaderboard);

    return { status: 'SUCCESSFUL', data: sortedLeaderboard };
  }

  public async getFinishedAwayTeamMatches(teamId: number): Promise<IMatch[]> {
    const allFinishedMatches = await this.matchService.getFinishedMatches();

    if (allFinishedMatches.status === 'SUCCESSFUL') {
      const teamMatches = allFinishedMatches.data
        .filter((match: IMatch) => match.awayTeamId === teamId);

      return teamMatches;
    }

    return [];
  }

  public async getAwayTeamsLeaderboard(): Promise<ServiceResponse<object[]>> {
    const allTeams = await this.teamModel.findAll();

    const promises = allTeams.map(async (team) => {
      const teamMatches = await this.getFinishedAwayTeamMatches(team.id);
      const teamLeaderboard = leaderboardUtils.getTeamLeaderboard(team, teamMatches);

      return teamLeaderboard;
    });

    const allTeamsLeaderboard = await Promise.all(promises);
    const sortedLeaderboard = leaderboardUtils.sortLeaderboard(allTeamsLeaderboard);

    return { status: 'SUCCESSFUL', data: sortedLeaderboard };
  }
}
