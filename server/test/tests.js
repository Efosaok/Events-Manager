import request from 'supertest';
import chai from 'chai';
import app from '../app';

const { expect } = chai;

describe('test-cases for api routes', () => {
  let token;
  describe('GET /', () => {
    it('responds with a 200 and welcome message in json', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { message: 'Welcome to the beginning of nothingness.' }, done);
    });
  });

  describe('GET /api', () => {
    it('responds with a 200 and welcome message in json', (done) => {
      request(app)
        .get('/api')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { message: 'Welcome to the events-manager Api' }, done);
    });
  });

  describe('POST /api/v1/users', () => {
    it('creates a new User an responds with 201', (done) => {
      const userCredentials = {
        firstname: 'ororo',
        lastname: 'ronaldo',
        email: 'lionelmessi@barca.com',
        password: 'thegreatest',
        confirmpassword: 'thegreatest',
      };
      request(app)
        .post('/api/v1/users')
        .send(userCredentials)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done)
        .expect((res) => {
          console.log(res.body);
        });
    });
  });

  describe('POST /api/v1/users', () => {
    it('responds with a 200 and signs in a user', (done) => {
      const userCredentials = {
        email: 'lionelmessi@barca.com',
        password: 'thegreatest',
      };
      request(app)
        .post('/api/v1/users/signin')
        .send(userCredentials)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          token = res.body.token;
          expect(typeof res.body.token).to.be.a('string');
          console.log(`TOKEN HERE ${token}`);
        });
    });
  });
});
