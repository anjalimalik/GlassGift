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

function callSignupApi(state) {
  return new Promise((resolve, reject) => {
    const body = {
      name: state.name,
      email: state.email,
      password: state.password,
      location: state.location || '',
    }
    if (state.tab === SIGNUP_TAB_DONOR) {
      body.age = state.age || 0;
      body.gender = state.gender || 'Male';
      axios.post('http://localhost:3000/donor/', body)
      .then(response => resolve(response.data))
      .catch(error => {console.log(error); reject(new Error("Error signing up"))});
    } else {
      body.category = state.category.value;
      body.description = state.description;
      body.minLimit = state.donationMin;
      body.maxLimit = state.donationMax;
      body.calLink = state.calendarLink;
      axios.post('http://localhost:3000/ngo/', body)
      .then(response => resolve(response.data))
      .catch(error => reject(new Error("Error signing up")));
    }
  });
}

export function signup(state) {
  const request = callSignupApi(state);
  return dispatch => {
    dispatch(signupPending(true));
    return request
    .then(response => dispatch(signupSuccess(response)))
    .catch(error => dispatch(signupError(error)));
  };
}
