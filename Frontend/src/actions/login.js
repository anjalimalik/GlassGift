import axios from 'axios';
import { saveUserToken } from './utils';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_CLEAR = 'LOGIN_CLEAR';

export function loginPending(pending) {
  return {
    type: LOGIN_PENDING,
    payload: pending,
  };
}

export function loginSuccess(success) {
  return {
    type: LOGIN_SUCCESS,
    payload: success,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
}

export function loginClear() {
  return {
    type: LOGIN_CLEAR,
  };
}

function callLoginApi(email, password, cb) {
  return new Promise((resolve, reject) => {
    const body = {
      email,
      password,
    };
    axios.post('http://localhost:3000/api/auth/login', body)
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  })
}

export function login(email, password, rememberMe) {
  const request = callLoginApi(email, password);
  return dispatch => {
    dispatch(loginPending(true));
    return request
    .then(response => {
      saveUserToken(response.token);
      dispatch(loginSuccess(response));
    })
    .catch(error => dispatch(loginError(error)));
  };
}
