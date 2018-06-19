import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import generateToken from '../generateToken';

const authToken = generateToken({
  userId: '5da26755-5135-480d-b016-4cd429bb46ec'
});
describe('userIsSuperAdmin helper function', () => {
  it(`returns a status code of 403 and error
  message if user is not superadmin`, (done) => {
    request(app)
      .get('/api/v1/users')
      .send({})
      .set('Accept', 'application/json')
      .set('x-access-token', authToken)
      .expect('Content-Type', /json/)
      .expect(403, done)
      .expect((res) => {
        expect(res.body.error)
          .toEqual('You are not authorized to perform this action');
      });
  });
});
