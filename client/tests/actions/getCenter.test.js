import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import centerMockData from '../__mocks__/centerMockData';
import instance from '../../utils/axios';
import { getACenter, promptSeeCenter, clearErrors } from '../../actions/centerActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async center related actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for get center action', () => {
    it(`creates FETCHING_A_CENTER and FETCH_A_CENTER_RESOLVED
    upon succesful center fetch from api`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: centerMockData.successFetchCenter
        });
      });
      const returnedActions = [
        {
          type: 'FETCHING_A_CENTER',
        },
        {
          type: 'FETCH_A_CENTER_RESOLVED',
          payload: centerMockData.successFetchCenter,
        },
      ];
      const store = mockStore({});
      await store.dispatch(getACenter('1234'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates FETCH_CENTER_REJECTED
    upon unsuccesful center fetch`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
          response: centerMockData.genericErrorResponse,
        });
      });
      const returnedActions = [
        {
          type: 'FETCHING_A_CENTER',
        },
        {
          type: 'FETCH_A_CENTER_REJECTED',
          payload: centerMockData.genericErrorResponse,
        },
      ];
      const store = mockStore({});
      await store.dispatch(getACenter('12345'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates PROMPT_SEE_A_CENTER
    upon prompt to fetch a center`, async (done) => {
      const returnedActions = [
        {
          type: 'PROMPT_SEE_A_CENTER',
          centerId: '1234'
        },
      ];
      const store = mockStore({});
      await store.dispatch(promptSeeCenter('1234'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates CLEAR_ERROR
    upon clearing center-based errors`, async (done) => {
      const returnedActions = [
        {
          type: 'CLEAR_ERROR',
        },
      ];
      const store = mockStore({});
      await store.dispatch(clearErrors());
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
