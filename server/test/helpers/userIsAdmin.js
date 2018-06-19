import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import generateToken from '../generateToken';

const authToken = generateToken({
  userId: '5da26755-5135-480d-b016-4cd429bb46ec'
});
describe('userIsAdmin helper function', () => {
  it(`returns a status code of 403 and
  error message if user is not admin`, (done) => {
    request(app)
      .put('/api/v1/centers/bc4725b5-1840-4ab3-8fc9-08132572dedc')
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
