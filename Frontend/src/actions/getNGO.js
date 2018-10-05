import axios from 'axios';
import { getUserToken } from './utils';

export const GET_NGO_PENDING = 'GET_NGO_PENDING';
export const GET_NGO_SUCCESS = 'GET_NGO_SUCCESS';
export const GET_NGO_ERROR = 'GET_NGO_ERROR';
export const GET_NGO_CLEAR = 'GET_NGO_CLEAR';

export function getNGOPending(pending) {
  return {
    type: GET_NGO_PENDING,
    payload: pending,
  };
}

export function getNGOSuccess(success) {
  return {
    type: GET_NGO_SUCCESS,
    payload: success,
  };
}

export function getNGOError(error) {
  return {
    type: GET_NGO_ERROR,
    payload: error,
  };
}

export function getNGOClear() {
  return {
    type: GET_NGO_CLEAR,
  };
}

function callgetNGOApi(id) {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) reject(new Error("No token!"));
    const body = {
      id,
    };
    axios.get('http://localhost:3000/ngo/', { headers: { Authentication: token }})
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function getNGO(id) {
  const request = callgetNGOApi(id);
  return dispatch => {
    dispatch(getNGOPending(true));
    return request
    .then(response => dispatch(getNGOSuccess(response)))
    .catch(error => dispatch(getNGOError(error)));
  };
}
