import axios from 'axios';

export const FORGOT_PASSWORD_PENDING = 'FORGOT_PASSWORD_PENDING';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_CLEAR = 'FORGOT_PASSWORD_CLEAR';

export function forgotPasswordPending(pending) {
  return {
    type: FORGOT_PASSWORD_PENDING,
    payload: pending,
  };
}

export function forgotPasswordSuccess(success) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: success,
  };
}

export function forgotPasswordError(error) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    payload: error,
  };
}

export function forgotPasswordClear() {
  return {
    type: FORGOT_PASSWORD_CLEAR,
  };
}

function callForgotPasswordApi(email) {
  return new Promise((resolve, reject) => {
    const body = {
      email,
    };
    axios.post('http://localhost:3000/forgot_password', body)
    .then(response => resolve())
    .catch(error => reject(new Error(error.response.data.error)));
  });
}


export function forgotPassword(email) {
  const request = callForgotPasswordApi(email);
  return dispatch => {
    dispatch(forgotPasswordPending(true));
    return request
    .then(() => dispatch(forgotPasswordSuccess(true)))
    .catch(error => dispatch(forgotPasswordError(error)));
  };
}
