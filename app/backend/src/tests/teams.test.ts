import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import teamsMock from './mocks/teams.mock';
import { HTTP_NOT_FOUND_STATUS, HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team route', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all teams', async () => {
    sinon.stub(SequelizeTeam, "findAll").resolves(teamsMock.teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(HTTP_OK_STATUS);
    expect(body).to.be.deep.equal(teamsMock.teams);
  });

  it('should return a specific team', async () => {
    sinon.stub(SequelizeTeam, "findByPk").resolves(teamsMock.teams[ 0 ] as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(HTTP_OK_STATUS);
    expect(body).to.be.deep.equal(teamsMock.teams[ 0 ]);
  });

  it('should return an error message if team is not found', async () => {
    sinon.stub(SequelizeTeam, "findByPk").resolves(null);

    const { status, body } = await chai.request(app).get('/teams/0');

    expect(status).to.be.equal(HTTP_NOT_FOUND_STATUS);
    expect(body).to.be.deep.equal(teamsMock.errorMessage);
  });
});