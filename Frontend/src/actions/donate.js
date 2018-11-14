import axios from 'axios';
import { getUserToken } from '../utils';

export const DONATE_PENDING = 'DONATE_PENDING';
export const DONATE_SUCCESS = 'DONATE_SUCCESS';
export const DONATE_ERROR = 'DONATE_ERROR';
export const DONATE_CLEAR = 'DONATE_CLEAR';

export function donatePending(pending) {
  return {
    type: DONATE_PENDING,
    payload: pending,
  };
}

export function donateSuccess(success) {
  return {
    type: DONATE_SUCCESS,
    payload: success,
  };
}

export function donateError(error) {
  return {
    type: DONATE_ERROR,
    payload: error,
  };
}

export function donateClear() {
  return {
    type: DONATE_CLEAR,
  };
}

function callDonateApi(body) {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) reject(new Error("No token!"));
    axios.post('http://localhost:3000/donation/', body,  { headers: { Authorization: token }})
    .then(response => resolve(response.data))
    .catch(error => { reject(new Error(error.response.data.error || 'Network Error'))});
  });
}


export function donate(body) {
  const request = callDonateApi(body);
  return dispatch => {
    dispatch(donatePending(true));
    return request
    .then(response => dispatch(donateSuccess(response)))
    .catch(error => dispatch(donateError(error)));
  };
}
