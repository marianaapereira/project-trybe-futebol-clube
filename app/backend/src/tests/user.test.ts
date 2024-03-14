import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import UserService from '../services/UserService';
import userMock from './mocks/user.mock';
import { HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

chai.use(chaiHttp);

const { expect } = chai;

describe('User route', () => {
  afterEach(() => {
    sinon.restore();
  });

  const userService = new UserService();

  it('should return all users', async () => {
    sinon.stub(SequelizeUser, "findAll").resolves(userMock.users as any);

    const serviceResponse = await userService.getAllUsers();

    expect(serviceResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(serviceResponse.data).to.be.deep.equal(userMock.users);
  });

  it('should return a specific user', async () => {
    sinon.stub(SequelizeUser, "findByPk").resolves(userMock.users[ 0 ] as any);

    const serviceResponse = await userService.getUserById(1);

    expect(serviceResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(serviceResponse.data).to.be.deep.equal(userMock.users[ 0 ]);
  });
});