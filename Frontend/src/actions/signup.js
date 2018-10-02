import axios from 'axios';
import { SIGNUP_TAB_DONOR } from '../constants';

export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_CLEAR = 'SIGNUP_CLEAR';

export function signupPending(pending) {
  return {
    type: SIGNUP_PENDING,
    payload: pending,
  };
}

export function signupSuccess(response) {
  return {
    type: SIGNUP_SUCCESS,
    payload: response,
  };
}

export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    payload: error,
  };
}

export function signupClear() {
  return {
    type: SIGNUP_CLEAR,
  };
}

// Testing function
function callSignupApi(state) {
  return new Promise((resolve,reject) => {
    const body = {
      name: state.name,
      email: state.email,
      password: state.password,
      location: state.location,
    }
    if (state.tab === SIGNUP_TAB_DONOR) {
      body.type = 'donor';
    } else {
      body.type = 'ngo';
      body.categories = state.categories;
    }

    axios.post('http://localhost:3000/api/auth/register', body)
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function signup(state) {
  return dispatch => {
    dispatch(signupPending(true));
    callSignupApi(state)
    .then(response => dispatch(signupSuccess(response)))
    .catch(error => dispatch(signupError(error)));
  };
}
