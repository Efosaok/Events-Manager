import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import eventMockData from '../__mocks__/eventMockData';
import instance from '../../utils/axios';
import { deleteEvent, promptDelete } from '../../actions/eventActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async event related actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for delete event action', () => {
    it(`creates DELETING_EVENT and DELETING_EVENT_RESOLVED
    upon succesful event deletion`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { message: 'you have successfully deleted this event' }
        });
      });
      const returnedActions = [
        {
          type: 'DELETING_EVENT',
        },
        {
          type: 'DELETE_EVENT_RESOLVED',
          payload: {
            message: 'you have successfully deleted this event',
          },
          eventId: '12345',
        },
      ];
      const store = mockStore({});
      await store.dispatch(deleteEvent('12345'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates DELETING_EVENT and DELETE_EVENT_REJECTED
    upon unsuccesful event creation`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
          response: eventMockData.genericErrorResponse
        });
      });
      const returnedActions = [
        {
          type: 'DELETING_EVENT',
        },
        {
          type: 'DELETE_EVENT_REJECTED',
          payload: {
            ...eventMockData.genericErrorResponse,
          }
        },
      ];
      const store = mockStore({});
      await store.dispatch(deleteEvent('1234567'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it('creates DELETE_EVENT_PROMPT upon delete event prompt', async (done) => {
      const returnedActions = [
        {
          type: 'DELETE_EVENT_PROMPT',
        },
      ];
      const store = mockStore({});
      await store.dispatch(promptDelete('1234567'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
