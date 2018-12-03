import axios from 'axios';

export const GET_CAL_DATA_PENDING = 'GET_CAL_DATA_PENDING';
export const GET_CAL_DATA_SUCCESS = 'GET_CAL_DATA_SUCCESS';
export const GET_CAL_DATA_ERROR = 'GET_CAL_DATA_ERROR';
export const GET_CAL_DATA_CLEAR = 'GET_CAL_DATA_CLEAR';

export function getCalDataPending(pending) {
  return {
    type: GET_CAL_DATA_PENDING,
    payload: pending,
  };
}

export function getCalDataSuccess(success) {
  return {
    type: GET_CAL_DATA_SUCCESS,
    payload: success,
  };
}

export function getCalDataError(error) {
  return {
    type: GET_CAL_DATA_ERROR,
    payload: error,
  };
}

export function getCalDataClear() {
  return {
    type: GET_CAL_DATA_CLEAR,
  };
}

function callGetCalDataApi(id, start, end) {
    var body = {
        ngoId: id,
        startdate: start,
        enddate: end,
    };
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:3000/ngo/visualCalendar`, body)
    .then(response => resolve(response.data))
    .catch(error => {
      if (error.response && error.response.error) {
        reject(new Error(error.response.data.error));
      }
      reject(new Error('Network Error'));
    });
  });
}

export function getCalData(id, start, end) {
    const request = callGetCalDataApi(id, start, end);
    return dispatch => {
      dispatch(getCalDataPending(true));
      return request
      .then(response => dispatch(getCalDataSuccess(response)))
      .catch(error => dispatch(getCalDataError(error)));
    };
}