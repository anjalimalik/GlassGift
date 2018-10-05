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
    console.log(state.category);
    const body = {
      location: state.location,
      category: state.category.value,
      description: state.description,
      minLimit: state.minLimit,
      maxLimit: state.maxLimit,
      calLink: state.calLink,
    };
    axios.put('http://localhost:3000/ngo/', body, { headers: { Authorization: token }})
    .then(response => resolve())
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function updateNGO(state) {
  const request = callUpdateNGOApi(state);
  return dispatch => {
    dispatch(updateNGOPending(true));
    return request
    .then(() => dispatch(updateNGOSuccess()))
    .catch(error => dispatch(updateNGOError(error)));
  };
}
