import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import eventMockData from '../__mocks__/eventMockData';
import instance from '../../utils/axios';
import { cancelUserEvent, clearError } from '../../actions/eventActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async event related actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for cancel event action', () => {
    it(`creates CANCELLING_USER_EVENT and CANCEL_USER_EVENT_RESOLVED
    upon succesful event cancellation`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { message: 'you have successfully cancelled the event' }
        });
      });
      const returnedActions = [
        {
          type: 'CANCELLING_USER_EVENT',
        },
        {
          type: 'CANCEL_USER_EVENT_RESOLVED',
          payload: {
            message: 'you have successfully cancelled the event',
          },
          eventId: '12345',
        },
      ];
      const store = mockStore({});
      await store.dispatch(cancelUserEvent('12345'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates CANCELLING_USER_EVENT and CANCEL_USER_EVENT_REJECTED
    upon unsuccesful event cancellation`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 403,
          response: eventMockData.genericErrorResponse
        });
      });
      const returnedActions = [
        {
          type: 'CANCELLING_USER_EVENT',
        },
        {
          type: 'CANCEL_USER_EVENT_REJECTED',
          payload: {
            ...eventMockData.genericErrorResponse,
          }
        },
      ];
      const store = mockStore({});
      await store.dispatch(cancelUserEvent('123'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it('creates CLEAR_ERROR when clearing event based errors', async (done) => {
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
