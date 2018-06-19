import request from 'supertest';
import expect from 'expect';
import app from '../../app';

describe('getOneCenter helper function test-suite', () => {
  it('it fetches a center without the associated events', (done) => {
    request(app)
      .get('/api/v1/centers/bc4725b5-1840-4ab3-8fc9-08132572dedc?centeronly=true') // eslint-disable-line
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect((res) => {
        expect(res.body.center.name).toEqual('New Center');
      });
  });
  it(`it returns status code 404 and error
  message if center is not found`, (done) => {
    request(app)
      .get('/api/v1/centers/bc4725b5-1840-4ab3-8fc9-08132572ded9?centeronly=true')  // eslint-disable-line
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
      .expect((res) => {
        expect(res.body.error).toEqual('center not found');
      });
  });
});
