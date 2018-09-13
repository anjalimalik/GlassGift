export const RESET_PASSWORD_PENDING = 'RESET_PASSWORD_PENDING';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD_CLEAR = 'RESET_PASSWORD_CLEAR';

export function resetPasswordPending(pending) {
  return {
    type: RESET_PASSWORD_PENDING,
    pending,
  };
}

export function resetPasswordSuccess(success) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    success,
  };
}

export function resetPasswordError(error) {
  return {
    type: RESET_PASSWORD_ERROR,
    error,
  }
}

export function resetPasswordClear() {
  return {
    type: RESET_PASSWORD_CLEAR,
  };
}

// Testing function
function callResetPasswordApi(password, confPassword, cb) {
  setTimeout(() => {
    if (password === 'admin@example.com' && confPassword === 'admin') {
      return cb(null);
    }
    return cb(new Error('Invalid email and/or password'));
  }, 500);
}


export function resetPassword(password, confPassword) {
  return (dispatch) => {
    dispatch(resetPasswordPending(true));
    callResetPasswordApi(password, confPassword, (error) => {
      dispatch(resetPasswordPending(false));
      if (!error) {
        dispatch(resetPasswordSuccess(true));
      } else {
        dispatch(resetPasswordError(error));
      }
    });
  }
}
