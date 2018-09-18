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
  }
}

export function forgotPasswordClear() {
  return {
    type: FORGOT_PASSWORD_CLEAR,
  };
}

// Testing function
function callForgotPasswordApi(cb) {
  setTimeout(() => {
    return cb(new Error('Error forgetting Password!'));
  }, 500);
}


export function forgotPassword() {
  return (dispatch) => {
    dispatch(forgotPasswordPending(true));
    callForgotPasswordApi((error) => {
      if (!error) {
        dispatch(forgotPasswordSuccess(true));
      } else {
        dispatch(forgotPasswordError(error));
      }
    });
  }
}
