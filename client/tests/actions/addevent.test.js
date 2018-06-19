import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import eventMockData from '../__mocks__/eventMockData';
import instance from '../../utils/axios';
import { addEvent } from '../../actions/eventActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async event related actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for async add event action', () => {
    it(`creates ADD_EVENT and ADD_EVENT_RESOLVED
    upon succesful event creation`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: {
            ...eventMockData.oneEvent,
            message: 'you have successfully added an event'
          }
        });
      });
      const returnedActions = [
        {
          type: 'ADD_EVENT'
        },
        {
          type: 'ADD_EVENT_RESOLVED',
          payload: {
            message: 'you have successfully added an event',
            ...eventMockData.oneEvent
          }
        }
      ];
      const eventDetails = {
        ...eventMockData.oneEvent
      };
      const store = mockStore({});
      await store.dispatch(addEvent(eventDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates ADD_EVENT and ADD_EVENT_REJECTED
    upon unsuccesful event creation`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: eventMockData.genericErrorResponse
        });
      });
      const returnedActions = [
        {
          type: 'ADD_EVENT'
        },
        {
          type: 'ADD_EVENT_REJECTED',
          payload: {
            ...eventMockData.genericErrorResponse
          }
        }
      ];
      const eventDetails = {
        ...eventMockData.oneEvent
      };
      const store = mockStore({});
      await store.dispatch(addEvent(eventDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
