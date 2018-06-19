import expect from 'expect';
import userReducers from '../../reducers/userReducers';

const unauthenticatedState = {
  token: '',
  unauthenticatedErrorMessage: '',
  status: {
    fetching: false,
    fetched: false,
    error: false,
    authenticated: false,
    unauthenticatedAttempt: false,
  }
};

const authenticatedState = {
  token: 'HGJGJGGG857855857mnbjhj',
  unauthenticatedErrorMessage: '',
  status: {
    unauthenticatedAttempt: false,
    authenticated: true,
    fetching: false,
    fetched: true,
    error: false,
    userRoleIschanged: false,
    fetchingAllUsers: true,
  }
};

describe('user reducer', () => {
  describe('signup reducers', () => {
    it(`should set status key fetching to true 
    on CREATE_USER action type`, () => {
      expect(userReducers(unauthenticatedState, {
        type: 'CREATE_USER'
      })).toEqual({
        ...unauthenticatedState,
        status: {
          ...unauthenticatedState.status,
          fetching: true,
        }
      });
    });
    it(`should set status key error to true on
    CREATE_USER_REJECTED action type`, () => {
      expect(userReducers(
        unauthenticatedState,
        { type: 'CREATE_USER_REJECTED', payload: { error: 'An error occured' } }
      )).toEqual({
        ...unauthenticatedState,
        errorMessage: 'An error occured',
        status: {
          ...unauthenticatedState.status,
          error: true,
        }
      });
    });
    it(`should set  key token to token in action payload
    and status key authenticated and fetched to true
    on CREATE_USER_RESOLVED action type`, () => {
      expect(userReducers(
        unauthenticatedState,
        { type: 'CREATE_USER_RESOLVED', token: 'gufjhrjgrh09887767' }
      )).toEqual({
        ...unauthenticatedState,
        token: 'gufjhrjgrh09887767',
        status: {
          ...unauthenticatedState.status,
          authenticated: true,
          fetched: true,
        }
      });
    });
  });

  describe('signin reducers', () => {
    it(`should set status key fetching to true
    on LOGIN_USER action type`, () => {
      expect(userReducers(unauthenticatedState, {
        type: 'LOGIN_USER'
      })).toEqual({
        ...unauthenticatedState,
        status: {
          ...unauthenticatedState.status,
          fetching: true,
        }
      });
    });
    it(`should set status key error to true
    on LOGIN_REJECTED action type`, () => {
      expect(userReducers(
        unauthenticatedState,
        { type: 'LOGIN_REJECTED', payload: { error: 'An error occured' } }
      )).toEqual({
        ...unauthenticatedState,
        errorMessage: 'An error occured',
        status: {
          ...unauthenticatedState.status,
          error: true,
        }
      });
    });
    it(`should set  key token to token in action
    payload and status key authenticated and fetched
    to true on LOGIN_RESOLVED action type`, () => {
      expect(userReducers(
        unauthenticatedState,
        { type: 'LOGIN_RESOLVED', token: 'gufjhrjgrh09887767' }
      )).toEqual({
        ...unauthenticatedState,
        token: 'gufjhrjgrh09887767',
        status: {
          ...unauthenticatedState.status,
          authenticated: true,
          fetched: true,
        }
      });
    });
  });

  describe('fetch users reducers', () => {
    it(`sets status key fetchingAllUsers to
    true on FETCHING_ALL_USERS action type`, () => {
      expect(userReducers(
        authenticatedState,
        { type: 'FETCHING_ALL_USERS' }
      )).toEqual({
        ...authenticatedState,
        status: {
          ...authenticatedState.status,
          fetchingAllUsers: true,
        }
      });
    });
    it(`sets status key fetchingAllUsers and error to false and true 
    espectively on FETCH_ALL_USERS_REJECTED action type`, () => {
      expect(userReducers(
        authenticatedState,
        { type: 'FETCH_ALL_USERS_REJECTED' }
      )).toEqual({
        ...authenticatedState,
        errorMessage: 'oops, an error occured',
        status: {
          ...authenticatedState.status,
          fetchingAllUsers: false,
          error: true,
        }
      });
    });
    it(`sets key allusers to allusers to value in action
    payload on FETCH_ALL_USERS_RESOLVED action type`, () => {
      expect(userReducers(
        authenticatedState,
        {
          type: 'FETCH_ALL_USERS_RESOLVED',
          payload: {
            users:
              [{
                id: 1,
                name: 'efosa',
                email: 'efosa@jhfd.com',
                role: 'User',
              }]
          },
        }
      )).toEqual({
        ...authenticatedState,
        allusers: {
          users:
            [{
              id: 1,
              name: 'efosa',
              email: 'efosa@jhfd.com',
              role: 'User',
            }]
        },
        status: {
          ...authenticatedState.status,
          fetchingAllUsers: false,
        }
      });
      authenticatedState.allusers = {
        users:
          [{
            id: 1,
            name: 'efosa',
            email: 'efosa@jhfd.com',
            role: 'User',
          }]
      };
    });
  });

  describe('assign users role reducers', () => {
    it(`sets status key assigning to true on
    ASSIGNING_USER_NEW_ROLE action type`, () => {
      expect(userReducers(
        authenticatedState,
        { type: 'ASSIGNING_USER_NEW_ROLE' },
      )).toEqual({
        ...authenticatedState,
        status: {
          ...authenticatedState.status,
          assigning: true,
        }
      });
    });
    it(`sets status key error to true on
    ASSIGNING_USER_NEW_ROLE_REJECTED action type`, () => {
      expect(userReducers(
        authenticatedState,
        { type: 'ASSIGNING_USER_NEW_ROLE_REJECTED' },
      )).toEqual({
        ...authenticatedState,
        status: {
          ...authenticatedState.status,
          assigning: false,
          error: true,
        }
      });
    });
    it(`toggles role of user object on
    ASSIGNING_USER_NEW_ROLE_RESOLVED action type`, () => {
      expect(userReducers(
        authenticatedState,
        { type: 'ASSIGNING_USER_NEW_ROLE_RESOLVED', userId: 1 },
      )).toEqual({
        ...authenticatedState,
        allusers: {
          users: [{
            id: 1,
            name: 'efosa',
            email: 'efosa@jhfd.com',
            role: 'Admin',
          }]
        },
        status: {
          ...authenticatedState.status,
          assigning: false,
          userRoleIschanged: true,
        }
      });
      authenticatedState.allusers = {
        users: [{
          id: 1,
          name: 'efosa',
          email: 'efosa@jhfd.com',
          role: 'Admin',
        }]
      };
    });
    it(`toggles role of user object on
    ASSIGNING_USER_NEW_ROLE_RESOLVED action type`, () => {
      expect(userReducers(
        authenticatedState,
        { type: 'ASSIGNING_USER_NEW_ROLE_RESOLVED', userId: 1 },
      )).toEqual({
        ...authenticatedState,
        allusers: {
          users: [{
            id: 1,
            name: 'efosa',
            email: 'efosa@jhfd.com',
            role: 'User',
          }]
        },
        status: {
          ...authenticatedState.status,
          assigning: false,
          userRoleIschanged: true,
        }
      });
      authenticatedState.allusers = {
        users: [{
          id: 1,
          name: 'efosa',
          email: 'efosa@jhfd.com',
          role: 'Admin',
        }]
      };
    });
    it('should return passed state on USER_LOGOUT', () => {
      expect(userReducers(unauthenticatedState, {
        type: 'USER_LOGOUT'
      })).toEqual(unauthenticatedState);
    });
    it('should clear state on CLEAR_ERROR', () => {
      expect(userReducers(unauthenticatedState, {
        type: 'CLEAR_ERROR'
      })).toEqual({
        ...unauthenticatedState,
        status: {
          ...unauthenticatedState.status,
          adding: false,
          added: false,
          error: false,
          unauthenticatedAttempt: false,
        }
      });
    });
    it('should return previous state if action type is not handled', () => {
      expect(userReducers(unauthenticatedState, {
        type: 'JKBHJVHG'
      })).toEqual(unauthenticatedState);
    });
  });
});
