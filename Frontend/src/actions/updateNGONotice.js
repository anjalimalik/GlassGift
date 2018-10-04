import axios from 'axios';
import { getUserToken } from './utils';

export const UPDATE_NGO_NOTICE_PENDING = 'UPDATE_NGO_NOTICE_PENDING';
export const UPDATE_NGO_NOTICE_SUCCESS = 'UPDATE_NGO_NOTICE_SUCCESS';
export const UPDATE_NGO_NOTICE_ERROR = 'UPDATE_NGO_NOTICE_ERROR';
export const UPDATE_NGO_NOTICE_CLEAR = 'UPDATE_NGO_NOTICE_CLEAR';

export function updateNGONoticePending(pending) {
  return {
    type: UPDATE_NGO_NOTICE_PENDING,
    payload: pending,
  };
}``

export function updateNGONoticeSuccess(success) {
  return {
    type: UPDATE_NGO_NOTICE_SUCCESS,
    payload: success,
  };
}

export function updateNGONoticeError(error) {
  return {
    type: UPDATE_NGO_NOTICE_ERROR,
    payload: error,
  };
}

export function updateNGONoticeClear() {
  return {
    type: UPDATE_NGO_NOTICE_CLEAR,
  };
}

function callupdateNGONoticeApi(notice) {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) reject(new Error("No token!"));
    const body = {
      notice,
    };
    axios.put('http://localhost:3000/ngo/notice', body, { headers: { Authentication: token }})
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function updateNGONotice(state) {
  const request = callupdateNGONoticeApi(state);
  return dispatch => {
    dispatch(updateNGONoticePending(true));
    return request
    .then(response => dispatch(updateNGONoticeSuccess(response)))
    .catch(error => dispatch(updateNGONoticeError(error)));
  };
}
