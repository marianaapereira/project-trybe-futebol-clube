import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import teamsMock from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team route', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all teams', async () => {
    sinon.stub(SequelizeTeam, "findAll").resolves(teamsMock as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsMock);
  });

  it('should return a specific team', async () => {
    sinon.stub(SequelizeTeam, "findByPk").resolves(teamsMock[ 0 ] as any);

    const { status, body } = await chai.request(app).get('/teams/0');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsMock[ 0 ]);
  });
});