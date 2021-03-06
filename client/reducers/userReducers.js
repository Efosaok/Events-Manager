import userInitialState from '../utils/userInitialState';
/**
 * modifies array by change in role key of object
 * @param {string} value Admin or User
 * @param {arr} arr array of users
 * @returns {array} modified Array
 */
const modifyArrayOfUsersByUpgradeChange = (value, arr) => {
  arr.forEach((index) => {
    if (index.id === value) {
      if (index.role === 'Admin') {
        index.role = 'User';
        return;
      }
      if (index.role === 'User') {
        index.role = 'Admin';
      }
    }
  });
  return arr;
};

/**
 *
 * @export es6 module export
 * @param {object} state previous state of app
 * @param {any} action
 * @returns {object} new state of app
 */
export default function userReducers(
  state = userInitialState() || {
    token: '',
    unauthenticatedErrorMessage: '',
    status: {
      fetching: false,
      fetched: false,
      error: false,
      authenticated: false,
      unauthenticatedAttempt: false
    }
  },
  action
) {
  switch (action.type) {
    case 'CREATE_USER': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false,
          authenticated: false
        }
      };
    }
    case 'CREATE_USER_RESOLVED': {
      return {
        ...state,
        token: action.token,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          authenticated: true,
          error: false
        }
      };
    }
    case 'CREATE_USER_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload.error,
        status: {
          ...state.status,
          fetching: false,
          error: true,
          authenticated: false
        }
      };
    }
    case 'LOGIN_USER': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false,
          authenticated: false
        }
      };
    }
    case 'LOGIN_RESOLVED': {
      return {
        ...state,
        token: action.token,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          authenticated: true,
          unauthenticatedAttempt: false
        }
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload.error,
        status: {
          ...state.status,
          fetching: false,
          error: true,
          authenticated: false,
          unauthenticatedAttempt: false
        }
      };
    }
    case 'FETCHING_ALL_USERS': {
      return {
        ...state,
        status: {
          ...state.status,
          fetchingAllUsers: true
        }
      };
    }
    case 'FETCH_ALL_USERS_RESOLVED': {
      return {
        ...state,
        allusers: action.payload,
        status: {
          ...state.status,
          fetchingAllUsers: false
        }
      };
    }
    case 'FETCH_ALL_USERS_REJECTED': {
      return {
        ...state,
        errorMessage: 'oops, an error occured',
        status: {
          ...state.status,
          fetchingAllUsers: false,
          error: true
        }
      };
    }
    case 'ASSIGNING_USER_NEW_ROLE': {
      return {
        ...state,
        status: {
          ...state.status,
          assigning: true,
          error: false
        }
      };
    }
    case 'ASSIGNING_USER_NEW_ROLE_RESOLVED': {
      return {
        ...state,
        allusers: {
          ...state.allusers,
          users: modifyArrayOfUsersByUpgradeChange(
            action.userId,
            state.allusers.users
          )
        },
        status: {
          ...state.status,
          assigning: false,
          error: false,
          userRoleIschanged: true
        }
      };
    }
    case 'ASSIGNING_USER_NEW_ROLE_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          assigning: false,
          error: true
        }
      };
    }
    case 'USER_LOGOUT': {
      return {
        ...state,
        status: {
          ...state.status,
          authenticated: false
        }
      };
    }
    case 'CLEAR_ERROR': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: false,
          error: false,
          unauthenticatedAttempt: false
        }
      };
    }
    default: {
      return state;
    }
  }
}
