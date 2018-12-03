import axios from 'axios';

export const GET_PIE_DATA_PENDING = 'GET_PIE_DATA_PENDING';
export const GET_PIE_DATA_SUCCESS = 'GET_PIE_DATA_SUCCESS';
export const GET_PIE_DATA_ERROR = 'GET_PIE_DATA_ERROR';
export const GET_PIE_DATA_CLEAR = 'GET_PIE_DATA_CLEAR';

export function getPieDataPending(pending) {
  return {
    type: GET_PIE_DATA_PENDING,
    payload: pending,
  };
}

export function getPieDataSuccess(success) {
  return {
    type: GET_PIE_DATA_SUCCESS,
    payload: success,
  };
}

export function getPieDataError(error) {
  return {
    type: GET_PIE_DATA_ERROR,
    payload: error,
  };
}

export function getPieDataClear() {
  return {
    type: GET_PIE_DATA_CLEAR,
  };
}

function callGetPieDataApi(id) {
    var body = {
        ngoId: id,
    };
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:3000/ngo/visualPieGraph`, body)
    .then(response => resolve(response.data))
    .catch(error => {
      if (error.response && error.response.error) {
        reject(new Error(error.response.data.error));
      }
      reject(new Error('Network Error'));
    });
  });
}

export function getPieData(id) {
    const request = callGetPieDataApi(id);
    return dispatch => {
      dispatch(getPieDataPending(true));
      return request
      .then(response => dispatch(getPieDataSuccess(response)))
      .catch(error => dispatch(getPieDataError(error)));
    };
}