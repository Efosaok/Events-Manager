import expect from 'expect';
import eventReducers from '../../reducers/eventReducers';
import eventInitialState from '../../utils/eventInitialState';

let alternateInitialState;

describe('tests for event reducers', () => {
  describe('add event reducers', () => {
    it(`sets status key adding and creatingEvent to true
    on ADD_EVENT action type`, () => {
      expect(eventReducers(eventInitialState(), {
        type: 'ADD_EVENT'
      })).toEqual({
        ...eventInitialState(),
        status: {
          ...eventInitialState().status,
          adding: true,
          creatingEvent: true,
        }
      });
    });
    it(`sets status key error to false on
    ADD_EVENT_REJECTED action type`, () => {
      expect(eventReducers(eventInitialState(), {
        type: 'ADD_EVENT_REJECTED',
        payload: { error: 'oops, an error occured' }
      })).toEqual({
        ...eventInitialState(),
        errorMessage: 'oops, an error occured',
        status: {
          ...eventInitialState().status,
          error: true,
          creatingEvent: false,
        }
      });
    });
    it(`sets status key added to true on
    ADD_EVENT_RESOLVED action type`, () => {
      expect(eventReducers(eventInitialState(), {
        type: 'ADD_EVENT_RESOLVED'
      })).toEqual({
        ...eventInitialState(),
        status: {
          ...eventInitialState().status,
          added: true,
          creatingEvent: false,
        }
      });
    });
  });

  describe('fetch events reducers', () => {
    it(`sets status key fetchingEvents to true on
    FETCH_EVENTS action type`, () => {
      expect(eventReducers(eventInitialState(), {
        type: 'FETCH_EVENTS'
      })).toEqual({
        ...eventInitialState(),
        status: {
          ...eventInitialState().status,
          fetchingEvents: true,
        }
      });
    });
    it(`sets status key error to true on
    FETCH_EVENTS_REJECTED action type`, () => {
      expect(eventReducers(eventInitialState(), {
        type: 'FETCH_EVENTS_REJECTED'
      })).toEqual({
        ...eventInitialState(),
        status: {
          ...eventInitialState().status,
          fetchingEvents: false,
          error: true,
        }
      });
    });
    it(`sets key events to events array on
    FETCH_EVENTS_RESOLVED action type`, () => {
      expect(eventReducers(eventInitialState(), {
        type: 'FETCH_EVENTS_RESOLVED',
        payload: {
          userEvents: [{
            id: 1,
            name: 'My Birthday',
            type: 'Bithday',
            center: 1,
          }]
        }
      })).toEqual({
        ...eventInitialState(),
        events: {
          userEvents: [{
            id: 1,
            name: 'My Birthday',
            type: 'Bithday',
            center: 1,
          }]
        },
      });
    });
    alternateInitialState = {
      ...eventInitialState(),
      events: {
        userEvents: [{
          id: 1,
          name: 'My Birthday',
          type: 'Bithday',
          center: 1,
        }],
        status: {
          ...eventInitialState().status,
        }
      }
    };
  });

  describe('delete event reducers', () => {
    it(`sets status key deleteEventPrompted to true
    on DELETE_EVENT_PROMPT action type`, () => {
      expect(eventReducers(alternateInitialState, {
        type: 'DELETE_EVENT_PROMPT'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          deleteEventPrompted: true,
        }
      });
    });
    it(`sets status key error to true on
    DELETE_EVENT_REJECTED action type`, () => {
      expect(eventReducers(alternateInitialState, {
        type: 'DELETE_EVENT_REJECTED'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          error: true,
        }
      });
    });
    it(`sets filters true user events array on
    DELETE_EVENT_RESOLVED action type`, () => {
      expect(eventReducers(alternateInitialState, {
        type: 'DELETE_EVENT_RESOLVED', eventId: 1
      })).toEqual({
        ...alternateInitialState,
        events: {
          userEvents: [],
        },
        status: {
          ...alternateInitialState.status,
          eventIsDeleted: true,
        }
      });
    });
  });

  describe('modify events reducers', () => {
    it(`sets status key modifyEventPrompted to true and eventObject 
  key to event to be modified on MODIFY_EVENT_PROMPT action type`, () => {
      expect(eventReducers(alternateInitialState, {
        type: 'MODIFY_EVENT_PROMPT', eventId: 1
      })).toEqual({
        ...alternateInitialState,
        eventObject: [{
          id: 1,
          name: 'My Birthday',
          type: 'Bithday',
          center: 1,
        }],
        status: {
          ...alternateInitialState.status,
          modifyEventPrompted: true,
        }
      });
    });
    it(`sets status key modifyingEvent to true on
    MODIFY_EVENT_PROMPT action type`, () => {
      expect(eventReducers(alternateInitialState, {
        type: 'MODIFYING_EVENT'
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          modifyingEvent: true,
        }
      });
    });
    it(`sets status key error to true on
    MODIFY_EVENT_REJECTED action type`, () => {
      expect(eventReducers(alternateInitialState, {
        type: 'MODIFY_EVENT_REJECTED',
        payload: {
          error: 'oops, an error occurred',
        }
      })).toEqual({
        ...alternateInitialState,
        errorMessage: 'oops, an error occurred',
        status: {
          ...alternateInitialState.status,
          error: true,
          modifyingEvent: false,
        }
      });
    });
    it(`sets status key eventisModified to true on
    MODIFY_EVENT_RESOLVED action type`, () => {
      expect(eventReducers(alternateInitialState, {
        type: 'MODIFY_EVENT_RESOLVED',
      })).toEqual({
        ...alternateInitialState,
        status: {
          ...alternateInitialState.status,
          eventIsModified: true,
          modifyingEvent: false,
        }
      });
    });
  });

  describe('clear reducers', () => {
    it('should clear state on USER_LOGOUT', () => {
      expect(eventReducers(eventInitialState(), {
        type: 'USER_LOGOUT'
      })).toEqual(eventInitialState());
    });
    it('should reset status keys to false on CLEAR_ERROR action type', () => {
      expect(eventReducers(eventInitialState(), {
        type: 'CLEAR_ERROR'
      })).toEqual({
        ...eventInitialState(),
        status: {
          ...eventInitialState().status,
          adding: false,
          added: false,
          error: false,
        }
      });
    });
    it('should return passed state on unhandled action type', () => {
      expect(eventReducers(alternateInitialState, {
        type: 'NULL'
      })).toEqual(alternateInitialState);
    });
  });
});
