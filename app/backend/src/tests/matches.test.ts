import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMock from './mocks/matches.mock';
import { HTTP_NOT_FOUND_STATUS, HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches route', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all matches', async () => {
    sinon.stub(SequelizeMatch, "findAll").resolves(matchesMock.matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(HTTP_OK_STATUS);
    expect(body).to.be.deep.equal(matchesMock.matches);
  });

  it('should return a specific match', async () => {
    sinon.stub(SequelizeMatch, "findByPk").resolves(matchesMock.matches[ 0 ] as any);

    const { status, body } = await chai.request(app).get('/matches/1');

    expect(status).to.be.equal(HTTP_OK_STATUS);
    expect(body).to.be.deep.equal(matchesMock.matches[ 0 ]);
  });

  it('should return an error message if match is not found', async () => {
    sinon.stub(SequelizeMatch, "findByPk").resolves(null);

    const { status, body } = await chai.request(app).get('/matches/0');

    expect(status).to.be.equal(HTTP_NOT_FOUND_STATUS);
    expect(body).to.be.deep.equal(matchesMock.errorMessage);
  });
});