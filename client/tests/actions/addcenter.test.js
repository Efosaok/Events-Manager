import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import centerMockData from '../__mocks__/centerMockData';
import instance from '../../utils/axios';
import {
  addCenter,
  getPrimaryCenterDetails,
  getRentalCostAndFacilities
} from '../../actions/centerActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.window = {};

describe('async center related actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('tests for async add center action', () => {
    it(`creates ADDING_CENTER and ADD_CENTER_RESOLVED
      upon succesful center creation`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: centerMockData.successAddCenterResponse
        });
      });
      const returnedActions = [
        {
          type: 'ADDING_CENTER'
        },
        {
          type: 'ADD_CENTER_RESOLVED',
          payload: centerMockData.successAddCenterResponse
        }
      ];
      const centerDetails = {
        ...centerMockData.successAddCenterResponse.primaryCenterDetails,
        ...centerMockData.successAddCenterResponse.rentalCostAndfacilities
      };
      const store = mockStore({});
      await store.dispatch(addCenter(centerDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates ADD_CENTER_REJECTED upon
    unsuccesful center creation`, async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 403,
          response: centerMockData.genericErrorResponse
        });
      });
      const returnedActions = [
        {
          type: 'ADDING_CENTER'
        },
        {
          type: 'ADD_CENTER_REJECTED',
          payload: centerMockData.genericErrorResponse
        }
      ];
      const centerDetails = {
        name: 'Another center'
      };
      const store = mockStore({});
      await store.dispatch(addCenter(centerDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates ADD_PRIMARY_CENTER_DETAILS when
    adding primary center details`, async (done) => {
      const returnedActions = [
        {
          type: 'ADD_PRIMARY_CENTER_DETAILS',
          payload: centerMockData.successAddCenterResponse.primaryCenterDetails
        }
      ];
      const primaryCenterDetails = {
        ...centerMockData.successAddCenterResponse.primaryCenterDetails
      };
      const store = mockStore({});
      await store.dispatch(getPrimaryCenterDetails(primaryCenterDetails));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });

    it(`creates ADD_RENTAL_COST_AND_FACILITIES when
    adding center facilities and rental costs`, async (done) => {
      const returnedActions = [
        {
          type: 'ADD_RENTAL_COST_AND_FACILITIES',
          payload:
            centerMockData.successAddCenterResponse.rentalCostAndfacilities
        }
      ];
      const rentalCostAndfacilities = {
        ...centerMockData.successAddCenterResponse.rentalCostAndfacilities
      };
      const store = mockStore({});
      await store.dispatch(getRentalCostAndFacilities(rentalCostAndfacilities));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
