import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import users from '../__mocks__/users';
import generateToken from '../generateToken';

const authToken = generateToken({ userId: 'kjhhffhf', role: 'SuperAdmin' });
const {
  invalidDetails,
  missingDetails,
  invalidSigninData,
  missingSigninDetails,
  emptySigninData,
} = users;
describe('user middleware validation test-suites', () => {
  describe('POST /api/v1/users', () => {
    it(`returns an array of error message and status code
    400 if user details are invalid`, (done) => {
      request(app)
        .post('/api/v1/users')
        .send(invalidDetails)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`returns an array of error message and status code 400
    if required details are missing`, (done) => {
      request(app)
        .post('/api/v1/users')
        .send(missingDetails)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
  });

  describe('POST /api/v1/users/signin', () => {
    it(`returns an array of error message and status code
    400 if user details are invalid`, (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(invalidSigninData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`returns an array of error message and status code 400
    if required user details are missing`, (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(missingSigninDetails)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
    it(`returns an array of error message and status code 400 if
    required user details are empty`, (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(emptySigninData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(Array.isArray(res.body.error)).toBeTruthy();
        });
    });
  });

  describe('PUT /api/v1/users/<userId>', () => {
    it(`returns an error message if userId route parameter
    is invalid`, (done) => {
      request(app)
        .put('/api/v1/users/dafc8ad3-7a1f-4888-874d-')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).toEqual('Invalid id parsed');
        });
    });
  });
});
