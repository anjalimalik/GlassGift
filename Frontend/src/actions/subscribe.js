import axios from 'axios';
import { getUserToken } from '../utils';

export const SUBSCRIBE_PENDING = 'SUBSCRIBE_PENDING';
export const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS';
export const SUBSCRIBE_ERROR = 'SUBSCRIBE_ERROR';
export const SUBSCRIBE_CLEAR = 'SUBSCRIBE_CLEAR';

export function subscribePending(pending) {
  return {
    type: SUBSCRIBE_PENDING,
    payload: pending,
  };
}

export function subscribeSuccess(success) {
  return {
    type: SUBSCRIBE_SUCCESS,
    payload: success,
  };
}

export function subscribeError(error) {
  return {
    type: SUBSCRIBE_ERROR,
    payload: error,
  };
}

export function subscribeClear() {
  return {
    type: SUBSCRIBE_CLEAR,
  };
}

function callSubscribeApi(body) {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) reject(new Error("No token!"));
    axios.post('http://localhost:3000/donor/subscribe', body, { headers: { Authorization: token }})
    .then(response => resolve())
    .catch(error => reject(new Error(error.response.data.error || 'Network Error')));
  });
}

export function subscribe(body) {
  const request = callSubscribeApi(body);
  return dispatch => {
    dispatch(subscribePending(true));
    return request
    .then(() => dispatch(subscribeSuccess(true)))
    .catch(error => dispatch(subscribeError(error)));
  };
}
