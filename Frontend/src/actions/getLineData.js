import axios from 'axios';

export const GET_LINE_DATA_PENDING = 'GET_LINE_DATA_PENDING';
export const GET_LINE_DATA_SUCCESS = 'GET_LINE_DATA_SUCCESS';
export const GET_LINE_DATA_ERROR = 'GET_LINE_DATA_ERROR';
export const GET_LINE_DATA_CLEAR = 'GET_LINE_DATA_CLEAR';

export function getLineDataPending(pending) {
  return {
    type: GET_LINE_DATA_PENDING,
    payload: pending,
  };
}

export function getLineDataSuccess(success) {
  return {
    type: GET_LINE_DATA_SUCCESS,
    payload: success,
  };
}

export function getLineDataError(error) {
  return {
    type: GET_LINE_DATA_ERROR,
    payload: error,
  };
}

export function getLineDataClear() {
  return {
    type: GET_LINE_DATA_CLEAR,
  };
}

function callGetLineDataApi(id) {
  console.log("here in action" +id);
    var body = {
        ngoId: id,
    };
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:3000/ngo/visualLineGraph`, body)
    .then(response => resolve(response.data))
    .catch(error => {
      if (error.response && error.response.error) {
        reject(new Error(error.response.data.error));
      }
      reject(new Error('Network Error'));
    });
  });
}

export function getLineData(id) {
    const request = callGetLineDataApi(id);
    return dispatch => {
      dispatch(getLineDataPending(true));
      return request
      .then(response => dispatch(getLineDataSuccess(response)))
      .catch(error => dispatch(getLineDataError(error)));
    };
}