import axios from 'axios';
import { getUserToken } from './utils';

export const UPDATE_NGO_PENDING = 'UPDATE_NGO_PENDING';
export const UPDATE_NGO_SUCCESS = 'UPDATE_NGO_SUCCESS';
export const UPDATE_NGO_ERROR = 'UPDATE_NGO_ERROR';
export const UPDATE_NGO_CLEAR = 'UPDATE_NGO_CLEAR';

export function updateNGOPending(pending) {
  return {
    type: UPDATE_NGO_PENDING,
    payload: pending,
  };
}

export function updateNGOSuccess(success) {
  return {
    type: UPDATE_NGO_SUCCESS,
    payload: success,
  };
}

export function updateNGOError(error) {
  return {
    type: UPDATE_NGO_ERROR,
    payload: error,
  };
}

export function updateNGOClear() {
  return {
    type: UPDATE_NGO_CLEAR,
  };
}

function callUpdateNGOApi(state) {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) reject(new Error("No token!"));
    const body = {
      location: state.location,
      categories: state.categories,
      description: state.description,
      donationMin: state.donationMin,
      donationMax: state.donationMax,
      calendarLink: state.calendarLink,
    };
    axios.put('http://localhost:3000/ngo/', body, { headers: { Authentication: token }})
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function updateNGO(state) {
  const request = callUpdateNGOApi(state);
  return dispatch => {
    dispatch(updateNGOPending(true));
    return request
    .then(response => dispatch(updateNGOSuccess(response)))
    .catch(error => dispatch(updateNGOError(error)));
  };
}
