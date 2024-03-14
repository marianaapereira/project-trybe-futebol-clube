// leaderboard service

import { TeamDataType } from '../types/TeamDataType';
import { ITeam } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { LeaderboardType } from '../types/LeaderboardType';

function calculateMatchData(
  goalsTeam1: number,
  goalsTeam2: number,
): LeaderboardType {
  const teamMatchesData = {
    totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0,
  };

  teamMatchesData.goalsFavor = goalsTeam1;
  teamMatchesData.goalsOwn = goalsTeam2;

  if (goalsTeam1 > goalsTeam2) {
    teamMatchesData.totalVictories = 1;
  } else if (goalsTeam1 < goalsTeam2) {
    teamMatchesData.totalLosses = 1;
  } else {
    teamMatchesData.totalDraws = 1;
  }

  return teamMatchesData;
}

function getMatchData(id: number, match: IMatch): LeaderboardType {
  const { homeTeamId, homeTeamGoals, awayTeamGoals } = match;

  if (homeTeamId === id) {
    return calculateMatchData(homeTeamGoals, awayTeamGoals);
  }

  return calculateMatchData(awayTeamGoals, homeTeamGoals);
}

function calculateTeamPoints(teamData: TeamDataType): object {
  const { totalVictories, totalDraws, goalsFavor, goalsOwn, totalGames } = teamData;

  const totalPoints = (totalVictories * 3) + totalDraws;
  const goalsBalance = goalsFavor - goalsOwn;
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

  return {
    totalPoints,
    goalsBalance,
    efficiency,
  };
}

function getTeamMatchesData(teamId: number, teamMatches: IMatch[]): LeaderboardType {
  const teamMatchesData = {
    totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0,
  };

  for (let i = 0; i < teamMatches.length; i += 1) {
    const { totalVictories, totalDraws, totalLosses,
      goalsFavor, goalsOwn } = getMatchData(teamId, teamMatches[i]);

    teamMatchesData.goalsFavor += goalsFavor;
    teamMatchesData.goalsOwn += goalsOwn;
    teamMatchesData.totalDraws += totalDraws;
    teamMatchesData.totalLosses += totalLosses;
    teamMatchesData.totalVictories += totalVictories;
  }

  return teamMatchesData;
}

function getTeamLeaderboard(team: ITeam, teamMatches: IMatch[]): LeaderboardType {
  const name = team.teamName;
  const totalGames = teamMatches.length;

  const teamMatchesData = getTeamMatchesData(team.id, teamMatches);

  const { totalVictories, totalDraws, goalsFavor, goalsOwn } = teamMatchesData;

  const teamPoints = calculateTeamPoints({
    totalVictories, totalDraws, goalsFavor, goalsOwn, totalGames,
  });

  return {
    name,
    totalGames,
    ...teamMatchesData,
    ...teamPoints,
  };
}

function sortLeaderboard(leaderboard: LeaderboardType[]): LeaderboardType[] {
  const sortedLeaderboard = leaderboard.sort((a, b) => {
    if (a && a.totalPoints !== undefined && b && b.totalPoints !== undefined
      && a.goalsBalance !== undefined && b.goalsBalance !== undefined) {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return (b.goalsFavor - a.goalsFavor);
          }

          return (b.goalsBalance - a.goalsBalance);
        }

        return (b.totalVictories - a.totalVictories);
      }

      return (b.totalPoints - a.totalPoints);
    }
    return 0;
  });

  return sortedLeaderboard;
}

export default {
  calculateMatchData,
  getMatchData,
  getTeamLeaderboard,
  sortLeaderboard,
};
