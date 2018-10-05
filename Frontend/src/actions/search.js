import axios from 'axios';

export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_CLEAR = 'SEARCH_CLEAR';

export function searchPending(pending) {
  return {
    type: SEARCH_PENDING,
    payload: pending,
  };
}

export function searchSuccess(success) {
  return {
    type: SEARCH_SUCCESS,
    payload: success,
  };
}

export function searchError(error) {
  return {
    type: SEARCH_ERROR,
    payload: error,
  };
}

export function searchClear() {
  return {
    type: SEARCH_CLEAR,
  };
}

function callSearchApi(BasisOf, Key) {
  return new Promise((resolve, reject) => {
    const body = {
      BasisOf,
      Key,
    };
    axios.post('http://localhost:3000/ngo/search', body)
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  })
}

export function search(BasisOf, Key) {
  const request = callSearchApi(BasisOf, Key)
  return (dispatch) => {
    dispatch(searchPending(true));
    return request
    .then(response => {
      dispatch({
        type: 'SEARCH',
        data: response.data
      });
      return response.data;
    })
    .catch(error => dispatch(searchError(error)));
  };
}
