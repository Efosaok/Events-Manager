import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import eventMockData from '../__mocks__/eventMockData';
import instance from '../../utils/axios';
import { fetchEvents } from '../../actions/eventActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async event related actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for fetch events action', () => {
    it(`creates FETCH_EVENTS and FETCH_EVENTS_RESOLVED
    upon succesful event data fetch`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: {
            userEvents: [eventMockData.oneEvent],
            message: 'you have successfully fetched events'
          }
        });
      });
      const returnedActions = [
        {
          type: 'FETCH_EVENTS',
        },
        {
          type: 'FETCH_EVENTS_RESOLVED',
          payload: {
            message: 'you have successfully fetched events',
            userEvents: [eventMockData.oneEvent],
          }
        },
      ];
      const eventDetails = {
        ...eventMockData.oneEvent,
      };
      const store = mockStore({});
      await store.dispatch(fetchEvents(eventDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates FETCH_EVENTS and FETCH_EVENTS_REJECTED
    upon succesful events data fetch`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: eventMockData.genericErrorResponse
        });
      });
      const returnedActions = [
        {
          type: 'FETCH_EVENTS',
        },
        {
          type: 'FETCH_EVENTS_REJECTED',
          payload: {
            ...eventMockData.genericErrorResponse,
          }
        },
      ];
      const eventDetails = {
        ...eventMockData.oneEvent,
      };
      const store = mockStore({});
      await store.dispatch(fetchEvents(eventDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
