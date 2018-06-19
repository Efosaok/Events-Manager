import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import events from '../__mocks__/events';
import generateToken from '../generateToken';

const { conflictingEventDates } = events;
const authToken = generateToken({});

describe('center is available test suite', () => {
  it(`returns status code 409 and error message
  if a center is not available`, (done) => {
    request(app)
      .post('/api/v1/events')
      .send(conflictingEventDates)
      .set('Accept', 'application/json')
      .set('x-access-token', authToken)
      .expect('Content-Type', /json/)
      .expect(400, done)
      .expect((res) => {
        expect(res.status.message).toEqual('Another Event is slated for  this center during the specified dates, please choose another date or center'); // eslint-disable-line
      });
  });
});
