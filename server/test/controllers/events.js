import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import events from '../__mocks__/events';
import generateToken from '../generateToken';

const { validEventDetails, modificationDetails } = events;
const authToken = generateToken({
  userId: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8'
});
describe('event related api endpoint test-suites', () => {
  describe('POST /api/v1/events', () => {
    it('creates an event and sends status code 201', (done) => {
      request(app)
        .post('/api/v1/events')
        .send(validEventDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(201, done)
        .expect((res) => {
          expect(res.body.message).toEqual('Event successfully added');
        });
    });
  });
  describe('PUT /api/v1/events/<eventId>', () => {
    it('modifies an event and sends status code 200', (done) => {
      request(app)
        .put('/api/v1/events/976ea87b-5644-4a61-ba05-f910ddea3138')
        .send(modificationDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).toEqual('successfully modified');
        });
    });
    it('returns a 404 and error message if event is not found', (done) => {
      request(app)
        .put('/api/v1/events/976ea87b-5644-4a61-ba05-f910ddea3130')
        .send(modificationDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(404, done)
        .expect((res) => {
          expect(res.body.error).toEqual('event not found');
        });
    });
  });
  describe('DELETE api/v1/events/<eventId>', () => {
    it('deletes an event and sends status code 200', (done) => {
      request(app)
        .delete('/api/v1/events/976ea87b-5644-4a61-ba05-f910ddea3138')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).toEqual('Event successfully deleted');
        });
    });
    it(`returns status code 404 and error
    message if event is not found`, (done) => {
      request(app)
        .delete('/api/v1/events/976ea87b-5644-4a61-ba05-f910ddea3130')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(404, done)
        .expect((res) => {
          expect(res.body.error).toEqual('event not found');
        });
    });
  });
  describe('GET /api/v1/events/user', () => {
    it('returns events of a user', (done) => {
      request(app)
        .get('/api/v1/events/user')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).toEqual('Success');
        });
    });
  });
});
