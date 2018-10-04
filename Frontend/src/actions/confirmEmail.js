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

// Testing function
function callConfirmEmailApi(cb) {
  setTimeout(() => {
    // return cb();
    return cb(new Error('Error forgetting Password!'));
  }, 500);
}


export function confirmEmail() {
  return dispatch => {
    dispatch(confirmEmailPending(true));
    callConfirmEmailApi(error => {
      if (!error) {
        dispatch(confirmEmailSuccess(true));
      } else {
        dispatch(confirmEmailError(error));
      }
    });
  };
}
