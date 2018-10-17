import axios from 'axios';

export const CONFIRM_EMAIL_PENDING = 'CONFIRM_EMAIL_PENDING';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_ERROR = 'CONFIRM_EMAIL_ERROR';
export const CONFIRM_EMAIL_CLEAR = 'CONFIRM_EMAIL_CLEAR';

export function confirmEmailPending(pending) {
  return {
    type: CONFIRM_EMAIL_PENDING,
    payload: pending,
  };
}

export function confirmEmailSuccess(success) {
  return {
    type: CONFIRM_EMAIL_SUCCESS,
    payload: success,
  };
}

export function confirmEmailError(error) {
  return {
    type: CONFIRM_EMAIL_ERROR,
    payload: error,
  };
}

export function confirmEmailClear() {
  return {
    type: CONFIRM_EMAIL_CLEAR,
  };
}

function callConfirmEmailApi(token) {
  return new Promise((resolve, reject) => {
    const body = {
      token,
    };
    axios.post('http://localhost:3000/confirm_account', body)
    .then(response => resolve())
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function confirmEmail(token) {
  const request = callConfirmEmailApi(token);
  return dispatch => {
    dispatch(confirmEmailPending(true));
    return request
    .then(() => dispatch(confirmEmailSuccess(true)))
    .catch(error => dispatch(confirmEmailError(error)));
  };
}
