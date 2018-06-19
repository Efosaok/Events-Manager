import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import centers from '../__mocks__/centers';
import generateToken from '../generateToken';

const authToken = generateToken({
  userId: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8'
});
const { validCenterDetails } = centers;
describe('center related api endpoint test-suites', () => {
  describe('POST /api/v1/centers', () => {
    it('creates a center and sends status code 201', (done) => {
      validCenterDetails.name = 'Very Imperial';
      request(app)
        .post('/api/v1/centers')
        .send(validCenterDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(201, done)
        .expect((res) => {
          expect(res.body.message)
            .toEqual('You have successfully added a center');
        });
    });
    it(`returns status code 409 and error
    message if name has been taken`, (done) => {
      request(app)
        .post('/api/v1/centers')
        .send(validCenterDetails)
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(409, done)
        .expect((res) => {
          expect(res.body.error)
            .toEqual('this name has been taken, Please choose another name');
        });
    });
  });
  describe('PUT /api/v1/centers', () => {
    it('modifies a center and sends status code 200', (done) => {
      request(app)
        .put('/api/v1/centers/37e6a662-1946-4712-a935-99b1e412a860')
        .send({ name: 'Modified center' })
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message)
            .toEqual('You have successfully modified the center');
        });
    });
    it(`returns status code 404 and error
    message if center is not found`, (done) => {
      request(app)
        .put('/api/v1/centers/99fbe51e-0ef4-4ff6-bc1b-e76ad0bd27e9')
        .send({ name: 'Modified Center' })
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(404, done)
        .expect((res) => {
          expect(res.body.error)
            .toEqual('center not found!');
        });
    });
    it(`sets center availability to false if request body
    is empty and availability was true`, (done) => {
      request(app)
        .put('/api/v1/centers/99fbe51e-0ef4-4ff6-bc1b-e76ad0bd27ee')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message)
            .toEqual('Successfully changed center status to false');
        });
    });
    it(`sets center availability to true if request body
    is empty and availability was false`, (done) => {
      request(app)
        .put('/api/v1/centers/99fbe51e-0ef4-4ff6-bc1b-e76ad0bd27ee')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message)
            .toEqual('Successfully changed availability status to true');
        });
    });
  });

  describe('GET /api/v1/centers/', () => {
    it('fetches centers', (done) => {
      request(app)
        .get('/api/v1/centers')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).toEqual('Success');
        });
    });
    it('performs a searchquery', (done) => {
      request(app)
        .get('/api/v1/centers?name=Rog')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.centers[0].name).toEqual('Rogaros');
        });
    });
  });
});
