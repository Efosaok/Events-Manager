import request from 'supertest';
import chai from 'chai';
import app from '../app';

const { expect } = chai;

describe('test-cases for api routes', () => {
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
});
