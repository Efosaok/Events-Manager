import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import userMockData from '../__mocks__/userMockData';
import instance from '../../utils/axios';
import {
  getAllUsers,
  assignUserRole,
  clearError
} from '../../actions/userActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async user based actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for fetching users', () => {
    it(`creates FETCHING_ALL_USERS and FETCH_ALL_USERS_RESOLVED
    upon fetchig users`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: userMockData.successAllUserResponse
        });
      });
      const returnedActions = [
        {
          type: 'FETCHING_ALL_USERS',
        },
        {
          type: 'FETCH_ALL_USERS_RESOLVED',
          payload: userMockData.successAllUserResponse,
        },
      ];
      const store = mockStore({});
      await store.dispatch(getAllUsers());
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates FETCH_ALL_USERS_REJECTED
    upon unsuccesful fetch`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
          response: userMockData.genericErrorResponse
        });
      });
      const returnedActions = [
        {
          type: 'FETCHING_ALL_USERS',
        },
        {
          type: 'FETCH_ALL_USERS_REJECTED',
          payload: userMockData.genericErrorResponse,
        },
      ];
      const store = mockStore({});
      await store.dispatch(getAllUsers());
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });

  describe('tests for async assign user new role', () => {
    it(`creates ASSIGNING_USER_NEW_ROLE and ASSIGNING_USER_NEW_ROLE_RESOLVED
    upon creating a User`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: userMockData.genericSuccessResponse,
        });
      });
      const returnedActions = [
        {
          type: 'ASSIGNING_USER_NEW_ROLE',
        },
        {
          type: 'ASSIGNING_USER_NEW_ROLE_RESOLVED',
          payload: userMockData.genericSuccessResponse,
          userId: 'vjvhhg'
        },
      ];
      const store = mockStore({});
      await store.dispatch(assignUserRole('vjvhhg'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates ASSIGNING_USER_NEW_ROLE and ASSIGNING_USER_NEW_ROLE_REJECTED
    upon creating a User`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 403,
          response: userMockData.genericErrorResponse
        });
      });
      const returnedActions = [
        {
          type: 'ASSIGNING_USER_NEW_ROLE',
        },
        {
          type: 'ASSIGNING_USER_NEW_ROLE_REJECTED',
          payload: userMockData.genericErrorResponse
        },
      ];
      const store = mockStore({});
      await store.dispatch(assignUserRole('hbjghjkghv'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
  describe('tests for async clear error action', () => {
    it('creates CLEAR_ERROR upon clearing user based errors', async (done) => {
      const returnedActions = [
        {
          type: 'CLEAR_ERROR',
        },
      ];
      const store = mockStore({});
      await store.dispatch(clearError());
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
