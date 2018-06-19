import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import centers from '../__mocks__/centers';
import generateToken from '../generateToken';

const { undefinedCenterDetails } = centers;
const authToken = generateToken({});
describe('authentication middleware test-suite', () => {
  it(`returns error message and status
  code 401 if token is invalid`, (done) => {
    request(app)
      .post('/api/v1/centers')
      .send(undefinedCenterDetails)
      .set('Accept', 'application/json')
      .set('x-access-token', authToken.slice(0, 10))
      .expect('Content-Type', /json/)
      .expect(401, done)
      .expect((res) => {
        expect(res.body.error)
          .toEqual('There seem to be an error,please login again to continue');
      });
  });
  it(`returns error message and status
  code 401 if token is not found`, (done) => {
    request(app)
      .post('/api/v1/centers')
      .send(undefinedCenterDetails)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done)
      .expect((res) => {
        expect(res.body.error).toEqual('You have to login First');
      });
  });
});
