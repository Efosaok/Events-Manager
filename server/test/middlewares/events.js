import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import events from '../__mocks__/events';
import generateToken from '../generateToken';

const {
  invalidEventDetails,
  missingEventDetails,
  pastStartDate,
  pastEndDate,
  emptyEventDetails,
  greaterStartDate
} = events;
const authToken = generateToken({});
describe('test suite for add event and modify event validations', () => {
  describe('POST /api/v1/events', () => {
    it(`returns an array of error message and status code
    400 on invalid event details`, (done) => {
      request(app)
        .post('/api/v1/events')
        .send(invalidEventDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`returns an array of error message and status
    code 400 on missing event details`, (done) => {
      request(app)
        .post('/api/v1/events/')
        .send(missingEventDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it('returns an array of error message if startDate is past', (done) => {
      request(app)
        .post('/api/v1/events/')
        .send(pastStartDate)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(406, done)
        .expect((res) => {
          expect(res.body.error)
            .toEqual('The start date chosen is past, please choose another date'); // eslint-disable-line
        });
    });
    it('returns an array of error message if endDate is past', (done) => {
      request(app)
        .post('/api/v1/events/')
        .send(pastEndDate)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(406, done)
        .expect((res) => {
          expect(res.body.error)
            .toEqual('The end date chosen is past, please choose another date');
        });
    });
    it(`returns an array of error message if
    startDate is greater than endDate`, (done) => {
      request(app)
        .post('/api/v1/events/')
        .send(greaterStartDate)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
  });
  describe('PUT /api/v1/events/<eventId>', () => {
    it(`returns an array of error message and status
    code 400 on invalid event details`, (done) => {
      request(app)
        .put('/api/v1/events/bc4725b5-1840-4ab3-8fc9-08132572dedc')
        .send(invalidEventDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`returns an array of error message and
    status code 400 on empty event detail`, (done) => {
      request(app)
        .put('/api/v1/events/bc4725b5-1840-4ab3-8fc9-08132572dedc')
        .send(emptyEventDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`returns error message and status
    code 406 if startDate is past`, (done) => {
      request(app)
        .put('/api/v1/events/bc4725b5-1840-4ab3-8fc9-08132572dedc')
        .send(pastStartDate)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(406, done)
        .expect((res) => {
          expect(res.body.error)
            .toEqual('The start date chosen is past, please choose another date'); // eslint-disable-line
        });
    });
    it(`returns error message and status
    code 406 if endDate is past`, (done) => {
      request(app)
        .put('/api/v1/events/bc4725b5-1840-4ab3-8fc9-08132572dedc')
        .send(pastEndDate)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(406, done)
        .expect((res) => {
          expect(res.body.error)
            .toEqual('The end date chosen is past, please choose another date');
        });
    });
    it(`returns an array of error message if
    startDate is greater than endDate`, (done) => {
      request(app)
        .put('/api/v1/events/bc4725b5-1840-4ab3-8fc9-08132572dedc')
        .send(greaterStartDate)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`returns an error message and status
    code 400 if event id is invalid`, (done) => {
      request(app)
        .put('/api/v1/events/bc4725b5-1840-4ab3-8fc9-0813257')
        .send(greaterStartDate)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).toEqual('Invalid id supplied');
        });
    });
  });
});
