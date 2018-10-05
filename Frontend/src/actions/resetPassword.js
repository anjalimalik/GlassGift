import axios from 'axios';

export const RESET_PASSWORD_PENDING = 'RESET_PASSWORD_PENDING';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD_CLEAR = 'RESET_PASSWORD_CLEAR';

export function resetPasswordPending(pending) {
  return {
    type: RESET_PASSWORD_PENDING,
    payload: pending,
  };
}

export function resetPasswordSuccess(success) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: success,
  };
}

export function resetPasswordError(error) {
  return {
    type: RESET_PASSWORD_ERROR,
    payload: error,
  };
}

export function resetPasswordClear() {
  return {
    type: RESET_PASSWORD_CLEAR,
  };
}

function callResetPasswordApi(password, token) {
  return new Promise((resolve, reject) => {
    const body = {
      password: password,
      token: token,
    };
    axios.put('http://localhost:3000/confirm_password', body)
    .then(response => resolve())
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function resetPassword(password, token) {
  const request = callResetPasswordApi(password, token);
  return dispatch => {
    dispatch(resetPasswordPending(true));
    return request
    .then(() => dispatch(resetPasswordSuccess(true)))
    .catch(error => dispatch(resetPasswordError(error)));
  };
}
