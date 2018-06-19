import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import users from '../__mocks__/users';
import generateToken from '../generateToken';

const authToken = generateToken({
  userId: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8'
});
const {
  validData, validSigninData, wrongEmail, wrongPassword
} = users;
describe('user related enpoints test-suites', () => {
  describe('POST /api/v1/users', () => {
    it('signs up a user and sends a token and status code 201', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(validData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done)
        .expect((res) => {
          expect(res.body.message).toEqual('You have successfully signed up');
        });
    });
    it('sends an error message if email already exists', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(validData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409, done)
        .expect((res) => {
          expect(res.body.error)
            .toEqual('Another user with this email already exists');
        });
    });
  });

  describe('POST /api/v1/users/signin', () => {
    it('signs in a user and sends a token and status code 200', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(validSigninData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message)
            .toEqual('You have successfully logged in');
        });
    });
    it(`sends an error message and status code
    400 if password is wrong`, (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(wrongPassword)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).toEqual('Invalid email or password');
        });
    });
    it(`sends an error message and status
    code 400 if email is wrong`, (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(wrongEmail)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).toEqual('Invalid email or password');
        });
    });
  });

  describe('PUT /api/v1/users/<userId>', () => {
    it('upgrades a user to admin and sends status code 202', (done) => {
      request(app)
        .put('/api/v1/users/5da26755-5135-480d-b016-4cd429bb46ec')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(202, done)
        .expect((res) => {
          expect(res.body.message)
            .toEqual('Ordinary User successfully upgraded');
        });
    });
    it('downgrades an admin to user and sends status code 202', (done) => {
      request(app)
        .put('/api/v1/users/5da26755-5135-480d-b016-4cd429bb46ec')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(202, done)
        .expect((res) => {
          expect(res.body.message)
            .toEqual('Admin User successfully downgraded');
        });
    });
  });
  describe('GET /api/v1/users/', () => {
    it('fetches all users and sends status code 200', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).toEqual('users successfully found');
        });
    });
  });
});
