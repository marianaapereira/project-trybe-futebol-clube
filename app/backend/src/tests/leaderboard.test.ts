import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LeaderboardService from '../services/LeaderboardService';
import leaderboardMock from './mocks/leaderboard.mock';
import { HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard route', () => {
  afterEach(() => {
    sinon.restore();
  });

  const leaderboardService = new LeaderboardService();

  it('should return home teams leaderboard', async () => {
    sinon.stub(leaderboardService, "getHomeTeamsLeaderboard").resolves(leaderboardMock.homeLeaderboard as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.be.equal(HTTP_OK_STATUS);
    expect(body).to.be.deep.equal(leaderboardMock.homeLeaderboard);
  });

  it('should return away teams leaderboard', async () => {
    sinon.stub(leaderboardService, "getAwayTeamsLeaderboard").resolves(leaderboardMock.awayLeaderboard as any);

    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.be.equal(HTTP_OK_STATUS);
    expect(body).to.be.deep.equal(leaderboardMock.awayLeaderboard);
  });
});