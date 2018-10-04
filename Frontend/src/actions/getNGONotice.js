import axios from 'axios';
import { getUserToken } from './utils';

export const GET_NGO_NOTICE_PENDING = 'GET_NGO_NOTICE_PENDING';
export const GET_NGO_NOTICE_SUCCESS = 'GET_NGO_NOTICE_SUCCESS';
export const GET_NGO_NOTICE_ERROR = 'GET_NGO_NOTICE_ERROR';
export const GET_NGO_NOTICE_CLEAR = 'GET_NGO_NOTICE_CLEAR';

export function getNGONoticePending(pending) {
  return {
    type: GET_NGO_NOTICE_PENDING,
    payload: pending,
  };
}``

export function getNGONoticeSuccess(success) {
  return {
    type: GET_NGO_NOTICE_SUCCESS,
    payload: success,
  };
}

export function getNGONoticeError(error) {
  return {
    type: GET_NGO_NOTICE_ERROR,
    payload: error,
  };
}

export function getNGONoticeClear() {
  return {
    type: GET_NGO_NOTICE_CLEAR,
  };
}

function callgetNGONoticeApi(notice) {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) reject(new Error("No token!"));
    const body = {
      notice,
    };
    axios.get('http://localhost:3000/ngo/notice', body, { headers: { Authentication: token }})
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function getNGONotice(state) {
  const request = callgetNGONoticeApi(state);
  return dispatch => {
    dispatch(getNGONoticePending(true));
    return request
    .then(response => dispatch(getNGONoticeSuccess(response)))
    .catch(error => dispatch(getNGONoticeError(error)));
  };
}
