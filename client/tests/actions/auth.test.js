import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import userMockData from '../__mocks__/userMockData';
import instance from '../../utils/axios';
import { userLogin, userSignup, logOut } from '../../actions/userActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async authentication related actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for async user sign in', () => {
    it('creates LOGIN_RESOLVED UPON LOGGING A USER IN', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: userMockData.successfulLoginResponse
        });
      });
      const returnedActions = [
        {
          type: 'LOGIN_USER',
        },
        {
          type: 'LOGIN_RESOLVED',
          payload: userMockData.successfulLoginResponse,
        },
      ];
      const userDetails = {
        email: 'efosaokpugie@gmail.com',
        password: 'swampious',
      };
      const store = mockStore({});
      await store.dispatch(userLogin(userDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it('creates LOGIN_REJECTED upon unsuccesful login', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 409,
          response: userMockData.unsuccessfulLoginResponse
        });
      });
      const returnedActions = [
        {
          type: 'LOGIN_USER',
        },
        {
          type: 'LOGIN_REJECTED',
          payload: userMockData.unsuccessfulLoginResponse,
        },
      ];
      const userDetails = {
        email: 'efosaokpugie@gmail.com',
        password: 'swampious99',
      };
      const store = mockStore({});
      await store.dispatch(userLogin(userDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });

  describe('tests for async user sign up', () => {
    it(`creates CREATE_USER and CREATE_USER_RESOLVED
    upon creating a User`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: userMockData.successfulLoginResponse
        });
      });
      const returnedActions = [
        {
          type: 'CREATE_USER',
        },
        {
          type: 'CREATE_USER_RESOLVED',
          payload: userMockData.successfulLoginResponse,
        },
      ];
      const userDetails = {
        email: 'e@gmail.com',
        password: 'swampious',
        firstname: 'melanin',
        lastname: 'melabro',
        confirmpassword: 'swampious'
      };
      const store = mockStore({});
      await store.dispatch(userSignup(userDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it('creates CREATE_USER_REJECTED upon unsuccesful signup', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 409,
          response: userMockData.unsuccessfulLoginResponse
        });
      });
      const returnedActions = [
        {
          type: 'CREATE_USER',
        },
        {
          type: 'CREATE_USER_REJECTED',
          payload: userMockData.unsuccessfulLoginResponse,
        },
      ];
      const userDetails = {
        email: 'e@gmail.com',
        password: 'swampious',
        firstname: 'melanin',
        lastname: 'melabro',
        confirmpassword: 'swampious'
      };
      const store = mockStore({});
      await store.dispatch(userSignup(userDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });

  describe('tests for async user sign up', () => {
    it('creates USER_LOGOUT', async (done) => {
      const returnedActions = [
        {
          type: 'USER_LOGOUT',
        },
      ];
      const store = mockStore({});
      await store.dispatch(logOut());
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});

