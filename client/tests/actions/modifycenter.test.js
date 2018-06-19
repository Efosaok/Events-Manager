import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import centerMockData from '../__mocks__/centerMockData';
import instance from '../../utils/axios';
import { modificationPrompt, modifyCenter } from '../../actions/centerActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async center related actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for async modify center action', () => {
    it(`creates MODIFYING_CENTER and MODIFY_CENTER_RESOLVED
    upon succesful center modification`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: centerMockData.successAddCenterResponse
        });
      });
      const returnedActions = [
        {
          type: 'MODIFYING_CENTER',
        },
        {
          type: 'MODIFY_CENTER_RESOLVED',
          payload: centerMockData.successAddCenterResponse,
        },
      ];
      const centerDetails = {
        ...centerMockData.successAddCenterResponse.center,
      };
      const store = mockStore({});
      await store.dispatch(modifyCenter(centerDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates MODIFY_CENTER_REJECTED upon
    unsuccesful center modification`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: centerMockData.genericErrorResponse,
        });
      });
      const returnedActions = [
        {
          type: 'MODIFYING_CENTER',
        },
        {
          type: 'MODIFY_CENTER_REJECTED',
          payload: centerMockData.genericErrorResponse,
        },
      ];
      const userDetails = {
        ...centerMockData.successAddCenterResponse.center,
      };
      const store = mockStore({});
      await store.dispatch(modifyCenter(userDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });

  describe('tests for modification prompt action', () => {
    it(`creates MODIFICATION_PROMPT upon
    center modification is prompted`, async (done) => {
      const returnedActions = [
        {
          type: 'MODIFICATION_PROMPT',
          centerId: 'HJBJHVHjhfjjtt909'
        }
      ];
      const store = mockStore({});
      await store.dispatch(modificationPrompt('HJBJHVHjhfjjtt909'));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
