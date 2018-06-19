import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import centers from '../__mocks__/centers';
import generateToken from '../generateToken';

const authToken = generateToken({
  userId: '96a3eeef-af55-492e-9b4e-7948137e7440',
  role: 'Admin',
});
const { undefinedCenterDetails, invalidCenterDetails } = centers;

describe('test suit for center validation middleware function', () => {
  describe('POST /api/v1/centers', () => {
    it(`it returns an array of error message and status
    code 400 if center details are invalid`, (done) => {
      request(app)
        .post('/api/v1/centers')
        .send(undefinedCenterDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`it returns an array of error message and status
    code 400 if center details are invalid`, (done) => {
      request(app)
        .post('/api/v1/centers')
        .send(invalidCenterDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`it returns an array of error message and status
    code 400 if center details are invalid`, (done) => {
      request(app)
        .post('/api/v1/centers')
        .send(invalidCenterDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
  });

  describe('PUT /api/v1/centers/<centerId>', () => {
    it(`it returns an array of error message and status
    code 400 if center details are invalid`, (done) => {
      request(app)
        .put('/api/v1/centers/bc4725b5-1840-4ab3-8fc9-08132572dedc')
        .send(undefinedCenterDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`it returns an array of error message and status
    code 400 if center details are invalid`, (done) => {
      request(app)
        .put('/api/v1/centers/bc4725b5-1840-4ab3-8fc9-08132572dedc')
        .send(invalidCenterDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`it returns an array of error message and status
    code 400 if center details are invalid`, (done) => {
      request(app)
        .put('/api/v1/centers/bc4725b5-1840-4ab3-8fc9-08132572dedc')
        .send(invalidCenterDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`returns a status code of 400 and
    error message if id is invalid`, (done) => {
      request(app)
        .put('/api/v1/centers/bc4725b5-1840-4ab3-8')
        .send(invalidCenterDetails)
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
