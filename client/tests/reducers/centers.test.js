import expect from 'expect';
import centerReducers from '../../reducers/centerReducers';
import centerInitialState from '../../utils/centerInitialState';

let alternateInitialState;

describe('tests for center reducers', () => {
  describe('add center reducers', () => {
    it(`sets key primaryCenterDetails to primary details of
    a center and status key addedPrimaryCenterDetails to true`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'ADD_PRIMARY_CENTER_DETAILS',
        payload: {
          name: 'Amity center',
          address: '23, Rogaro street',
          mobileNumber: '08035272406',
          type: 'Multipurpose hall',
        }
      })).toEqual({
        ...centerInitialState(),
        primaryCenterDetails: {
          name: 'Amity center',
          address: '23, Rogaro street',
          mobileNumber: '08035272406',
          type: 'Multipurpose hall'
        },
        status: {
          ...centerInitialState().status,
          addedPrimaryCenterDetails: true,
        }
      });
    });
    it(`sets key rentalCostAndFacilities to object from payload of a center
    and status key addedCost and addedFacilities to true`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'ADD_RENTAL_COST_AND_FACILITIES',
        payload: {
          rentalCost: '230000',
          facilities: ['swimming-pool', 'lounge'],
        }
      })).toEqual({
        ...centerInitialState(),
        rentalCostAndFacilities: {
          rentalCost: '230000',
          facilities: ['swimming-pool', 'lounge'],
        },
        status: {
          ...centerInitialState().status,
          addedCosts: true,
          addedFacilities: true,
        }
      });
    });
    it(`sets status key addingCenter to true
    on ADDING_CENTER action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'ADDING_CENTER'
      })).toEqual({
        ...centerInitialState(),
        status: {
          ...centerInitialState().status,
          addingCenter: true,
          addedCenter: false,
        }
      });
    });
    it(`sets status key addedCenter and error to false and true respectively
    on ADD_CENTER_REJECTED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'ADD_CENTER_REJECTED'
      })).toEqual({
        ...centerInitialState(),
        status: {
          ...centerInitialState().status,
          addingCenter: false,
          error: true,
          addedCenter: false,
        }
      });
    });
    it(`sets status key addedCenter to true
    on ADD_CENTER_RESOLVED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'ADD_CENTER_RESOLVED'
      })).toEqual({
        ...centerInitialState(),
        status: {
          ...centerInitialState().status,
          addingCenter: false,
          addedCenter: true,
        }
      });
    });
  });

  describe('image upload reducers', () => {
    it(`sets status key uploadingImage to true and parses
    imageUpload object on UPLOADING_CENTER_IMAGE action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'UPLOADING_CENTER_IMAGE', payload: '0%'
      })).toEqual({
        ...centerInitialState(),
        imageUpload: '0%',
        status: {
          ...centerInitialState().status,
          uploadingImage: true,
        }
      });
    });
    it(`sets status key uploadingImageCancelled to true on
    UPLOADING_CENTER_IMAGE_CANCELLED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'UPLOADING_CENTER_IMAGE_CANCELLED',
        payload: '0%'
      })).toEqual({
        ...centerInitialState(),
        status: {
          ...centerInitialState().status,
          uploadImageCancelled: true,
        }
      });
    });
    it(`sets status key uploadingImagePaused to true on
    UPLOADING_CENTER_IMAGE_PAUSED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'UPLOADING_CENTER_IMAGE_PAUSED',
        payload: '25%'
      })).toEqual({
        ...centerInitialState(),
        imageUpload: '25%',
        status: {
          ...centerInitialState().status,
          uploadImagePaused: true,
        }
      });
    });
    it(`sets status key uploadingImagePaused to true
    on UPLOADING_CENTER_IMAGE_PAUSED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'UPLOADING_CENTER_IMAGE_PAUSED',
        payload: '25%'
      })).toEqual({
        ...centerInitialState(),
        imageUpload: '25%',
        status: {
          ...centerInitialState().status,
          uploadImagePaused: true,
        }
      });
    });
    it(`sets status key error to true on
    UPLOADING_CENTER_IMAGE_REJECTED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'UPLOAD_CENTER_IMAGE_REJECTED',
        payload: { error: 'oops, an error occured', }
      })).toEqual({
        ...centerInitialState(),
        errorMessage: 'oops, an error occured',
        status: {
          ...centerInitialState().status,
          error: true,
        }
      });
    });
    it(`sets status key uploadedImage to true on
    UPLOAD_CENTER_IMAGE_RESOLVED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'UPLOAD_CENTER_IMAGE_RESOLVED',
        payload: '100%'
      })).toEqual({
        ...centerInitialState(),
        imageUpload: '100%',
        status: {
          ...centerInitialState().status,
          uploadedImage: true,
        }
      });
    });
  });

  describe('fetch a center reducers', () => {
    it(`sets status key fetching to true on
    FETCHING_A_CENTER action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'FETCHING_A_CENTER'
      })).toEqual({
        ...centerInitialState(),
        oneCenter: {
          aCenter: {},
        },
        status: {
          ...centerInitialState().status,
          fetching: true,
          fetchingACenter: true,
        },
      });
    });
    it(`sets status key getACenterprompted to true and parses centerId to
    key centerToGet on action type PROMPT_SEE_A_CENTER`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'PROMPT_SEE_A_CENTER', centerId: 1
      })).toEqual({
        ...centerInitialState(),
        centerToGet: 1,
        status: {
          ...centerInitialState().status,
          getACenterPrompted: true,
        }
      });
    });
    it(`sets status key fetching to true on
    FETCH_A_CENTER_REJECTED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'FETCH_A_CENTER_REJECTED',
        payload: 'oops, an error occured',
      })).toEqual({
        ...centerInitialState(),
        errorMessage: 'oops, an error occured',
        status: {
          ...centerInitialState().status,
          error: true,
          fetchingACenter: false,
        },
      });
    });
    it(`sets status key fetched to true and parse centerDetails
    on FETCH_A_CENTER_RESOLVED action type`, () => {
      expect(centerReducers(
        centerInitialState(),
        {
          type: 'FETCH_A_CENTER_RESOLVED',
          payload: {
            aCenter: {
              id: 1,
              name: 'Rogaros',
              capacity: '23000',
              venueOfEvent: [{
                name: 'My Birthday',
                type: 'Birthday party',
                id: 1,
                date: '2015-06-07',
              }]
            }
          }
        }
      )).toEqual({
        ...centerInitialState(),
        oneCenter: {
          aCenter: {
            id: 1,
            name: 'Rogaros',
            capacity: '23000',
            venueOfEvent: [{
              name: 'My Birthday',
              type: 'Birthday party',
              id: 1,
              date: '2015-06-07',
            }]
          }
        },
        status: {
          ...centerInitialState().status,
          fetched: true,
          fetchingACenter: false,
        },
      });
      alternateInitialState.oneCenter = {
        aCenter: {
          id: 1,
          name: 'Rogaros',
          capacity: '23000',
          venueOfEvent: [{
            name: 'My Birthday',
            type: 'Birthday party',
            id: 1,
            date: '2015-06-07',
          }]
        }
      };
    });
  });

  describe('fetch centers', () => {
    it(`sets the status key fetchingCenters to true
    on FETCH_CENTERS action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'FETCH_CENTERS'
      })).toEqual({
        ...centerInitialState(),
        status: {
          ...centerInitialState().status,
          fetchingCenters: true,
          fetching: true,
        }
      });
    });
    it(`sets the status key error to true on
    FETCH_CENTERS_REJECTED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'FETCH_CENTERS_REJECTED'
      })).toEqual({
        ...centerInitialState(),
        allCenters: {
          centers: [],
        },
        status: {
          ...centerInitialState().status,
          error: true,
          fetchingCenters: false,
        }
      });
    });
    it(`sets the status key fetched to true and sets allCenters key to parsed 
    in values on FETCH_CENTERS_RESOLVED action type`, () => {
      expect(centerReducers(centerInitialState(), {
        type: 'FETCH_CENTERS_RESOLVED',
        payload: {
          centers: [{
            name: 'nice center',
            id: 1,
            capacity: 23000,
          }],
          pages: 3,
          currentPage: 1,
        }
      })).toEqual({
        ...centerInitialState(),
        allCenters: {
          centers: [{
            name: 'nice center',
            id: 1,
            capacity: 23000,
          }],
          pages: 3,
          currentPage: 1,
        },
        status: {
          ...centerInitialState().status,
          fetched: true,
          fetchingCenters: false,
        }
      });
    });
    alternateInitialState = {
      ...centerInitialState(),
      allCenters: {
        centers: [{
          name: 'nice center',
          id: 1,
          capacity: 23000,
        }],
        pages: 3,
        currentPage: 1,
      },
    };
  });

  describe('modify centers reducers', () => {
    it(`sets status key modificationPrompted to
    true on MODIFICATION_PROMPT action type`, () => {
      expect(centerReducers(alternateInitialState, {
        type: 'MODIFICATION_PROMPT', centerId: 1
      })).toEqual({
        ...alternateInitialState,
        centerToBeModified: [{
          name: 'nice center',
          id: 1,
          capacity: 23000,
        }],
        status: {
          ...alternateInitialState.status,
          modificationPrompted: true,
        }
      });
    });
    it(`sets status key modifying to true
    on MODIFYING_CENTER action type`, () => {
      expect(centerReducers(alternateInitialState, {
        type: 'MODIFYING_CENTER'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          modifying: true,
          modified: false,
        }
      });
    });
    it(`sets status key modifying and modifed to false
    on MODIFY_CENTER_REJECTED action type`, () => {
      expect(centerReducers(alternateInitialState, {
        type: 'MODIFY_CENTER_REJECTED'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          modifying: false,
          modified: false,
        }
      });
    });
    it(`sets status key changeImagePrompted to true
    on IMAGE_CHANGE_PROMPT action type`, () => {
      expect(centerReducers(alternateInitialState, {
        type: 'IMAGE_CHANGE_PROMPT'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          changeImagePrompted: true,
        }
      });
    });
    it(`sets status key modifed to true on
    MODIFY_CENTER_RESOLVED action type`, () => {
      expect(centerReducers(alternateInitialState, {
        type: 'MODIFY_CENTER_RESOLVED'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          modifying: false,
          modified: true,
        }
      });
    });
  });

  describe('cancel user event reducers', () => {
    it(`sets status key cancellingEvent to true
    on CANCELLING_USER_EVENT action type`, () => {
      expect(centerReducers(alternateInitialState, {
        type: 'CANCELLING_USER_EVENT'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          cancellingEvent: true,
          eventCancelled: false,
        }
      });
    });
    it(`sets status key error to true on
    CANCEL_USER_EVENT_REJECTED action type`, () => {
      expect(centerReducers(alternateInitialState, {
        type: 'CANCEL_USER_EVENT_REJECTED'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          cancellingEvent: false,
          error: true,
          eventCancelled: false,
        }
      });
    });
    it(`sets status key error to true on
    CANCEL_USER_EVENT_RESOLVED action type`, () => {
      expect(centerReducers(alternateInitialState, {
        type: 'CANCEL_USER_EVENT_RESOLVED', eventId: 1
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          cancellingEvent: false,
          error: false,
          eventCancelled: true,
        }
      });
    });
    it(`sets status key error to true on
    CANCEL_USER_EVENT_RESOLVED action type`, () => {
      expect(centerReducers(alternateInitialState, {
        type: 'CANCEL_USER_EVENT_RESOLVED'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          cancellingEvent: false,
          error: false,
          eventCancelled: true,
        }
      });
    });
  });

  describe('clear error and logout reducers', () => {
    it('returns initial state on USER_LOGOUT action type', () => {
      expect(centerReducers(centerInitialState(), {
        type: 'USER_LOGOUT'
      })).toEqual(centerInitialState());
    });
    it('resets all status keys to false on CLEAR_ERROR action type', () => {
      expect(centerReducers(centerInitialState(), {
        type: 'CLEAR_ERROR'
      })).toEqual({
        ...centerInitialState(),
        status: {
          fetching: false,
          fetched: false,
          addedCosts: false,
          addedFacilities: false,
          error: false,
          uploadedImage: false,
          uploadingImage: false,
          addedPrimaryCenterDetails: false,
          uploadImagePaused: false,
          uploadImageCancelled: false,
          addingCenter: false,
          changeImagePrompted: false,
          deleteCenterPrompted: false,
          modifying: false,
          getACenterPrompted: false
        }
      });
    });
    it('returns default state if unhandled action type is passed', () => {
      expect(centerReducers(centerInitialState(), {
        type: 'NULL'
      })).toEqual(centerInitialState());
    });
  });
});
