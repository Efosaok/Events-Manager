import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import eventMockData from '../__mocks__/eventMockData';
import instance from '../../utils/axios';
import { modifyEvent, promptModify } from '../../actions/eventActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async event based actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for modify event action', () => {
    it(`creates MODIFYING_EVENT and MODIFY_EVENT_RESOLVED
    upon succesful event creation`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: {
            ...eventMockData.oneEvent,
            message: 'you have successfully modified this event'
          }
        });
      });
      const returnedActions = [
        {
          type: 'MODIFYING_EVENT',
        },
        {
          type: 'MODIFY_EVENT_RESOLVED',
          payload: {
            message: 'you have successfully modified this event',
            ...eventMockData.oneEvent,
          },
          eventId: '12345',
        },
      ];
      const eventDetails = {
        name: 'My conference'
      };
      const store = mockStore({});
      await store.dispatch(modifyEvent(eventDetails, '12345'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates MODIFYING_EVENT and MODIFY_EVENT_REJECTED
    upon unsuccesful event modification`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: eventMockData.genericErrorResponse
        });
      });
      const returnedActions = [
        {
          type: 'MODIFYING_EVENT',
        },
        {
          type: 'MODIFY_EVENT_REJECTED',
          payload: {
            ...eventMockData.genericErrorResponse,
          }
        },
      ];
      const eventDetails = {
        name: 'JHGFGHJGYFTVB'
      };
      const store = mockStore({});
      await store.dispatch(modifyEvent(eventDetails, '123'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it('creates MODIFY_EVENT_PROMPT upon modification prompt', async (done) => {
      const returnedActions = [
        {
          type: 'MODIFY_EVENT_PROMPT',
          eventId: '1234',
        },
      ];
      const store = mockStore({});
      await store.dispatch(promptModify('1234'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
