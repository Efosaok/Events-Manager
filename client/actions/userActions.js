import axios from 'axios';
import { browserHistory } from 'react-router';

const userSignup = (userDetails) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER' });
    axios.post('/api/v1/users', userDetails)
      .then((res) => {
        dispatch({ type: 'FETCH_USER_RESOLVED', payload: res.data });
        localStorage.setItem('x-access-token', res.data.token);
        console.log(res);
        browserHistory.push('/dashboard');
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_USER_REJECTED', payload: err.response.data });
      });
  };
};

const userLogin = (loginDetails) => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER' });
    axios.post('/api/v1/users/signin', loginDetails)
      .then((res) => {
        console.log(res);
        dispatch({ type: 'LOGIN_RESOLVED', payload: res.data });
        localStorage.setItem('x-access-token', res.data.token);
        browserHistory.push('/dashboard');
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_REJECTED', payload: err.response.data });
      });
  };
};

const clearError = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
  };
};


export {
  userSignup,
  userLogin,
  clearError,
};