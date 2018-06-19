import request from 'supertest';
import expect from 'expect';
import app from '../../app';

describe('validate query test suite', () => {
  it(`returns an arry of error message if page
  query is not a number test suite`, (done) => {
    request(app)
      .get('/api/v1/centers?page=ht')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
      .expect((res) => {
        expect(Array.isArray(res.body.error)).toBeTruthy();
      });
  });
  it(`returns an arry of error message if page query
  is less than 1`, (done) => {
    request(app)
      .get('/api/v1/centers?page=0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
      .expect((res) => {
        expect(Array.isArray(res.body.error)).toBeTruthy();
      });
  });
});
