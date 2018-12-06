import axios from 'axios';
import { getUserToken } from '../utils';

export const GET_SEARCHES_PENDING = 'GET_SEARCHES_PENDING';
export const GET_SEARCHES_SUCCESS = 'GET_SEARCHES_SUCCESS';
export const GET_SEARCHES_ERROR = 'GET_SEARCHES_ERROR';
export const GET_SEARCHES_CLEAR = 'GET_SEARCHES_CLEAR';

export function getSearchesPending(pending) {
  return {
    type: GET_SEARCHES_PENDING,
    payload: pending,
  };
}

export function getSearchesSuccess(success) {
  return {
    type: GET_SEARCHES_SUCCESS,
    payload: success,
  };
}

export function getSearchesError(error) {
  return {
    type: GET_SEARCHES_ERROR,
    payload: error,
  };
}

export function getSearchesClear() {
  return {
    type: GET_SEARCHES_CLEAR,
  };
}

function callGetSearchesApi() {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) reject(new Error("No token!"));
    axios.get('http://localhost:3000/searchHistory', { headers: { Authorization: token }})
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  })
}

export function getSearches() {
  const request = callGetSearchesApi();
  return dispatch => {
    dispatch(getSearchesPending(true));
    return request
    .then(response => {
      dispatch(getSearchesSuccess(response));
    })
    .catch(error => dispatch(getSearchesError(error)));
  };
}

// const response = [
//   {
//     text: 'Test',
//   },
//   {
//     text: 'Test2',
//   },
//   {
//     text: 'Test1',
//   },
// ];

// export function getSearches() {
//   return dispatch => {
//     dispatch(getSearchesPending(true));
//     setTimeout(() => dispatch(getSearchesSuccess(response)), 500);
//   }
// }