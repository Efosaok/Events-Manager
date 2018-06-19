import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import centerMockData from '../__mocks__/centerMockData';
import instance from '../../utils/axios';
import { getAllCenters } from '../../actions/centerActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async center based actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for centers fetch action', () => {
    it(`creates FETCH_CENTERS and FETCH_CENTERS_RESOLVED
    upon succesful centers fetch from api`, async (done) => {
      const successResponse = [
        centerMockData.successFetchCenter,
      ];
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: successResponse,
        });
      });
      const returnedActions = [
        {
          type: 'FETCH_CENTERS',
        },
        {
          type: 'FETCH_CENTERS_RESOLVED',
          payload: successResponse,
        },
      ];
      const store = mockStore({});
      await store.dispatch(getAllCenters());
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates FETCH_CENTERS_REJECTED
    upon unsuccesful centers fetch`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
          response: centerMockData.genericErrorResponse,
        });
      });
      const returnedActions = [
        {
          type: 'FETCH_CENTERS',
        },
        {
          type: 'FETCH_CENTERS_REJECTED',
          payload: centerMockData.genericErrorResponse,
        },
      ];
      const store = mockStore({});
      await store.dispatch(getAllCenters());
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
