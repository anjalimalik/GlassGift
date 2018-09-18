export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_CLEAR = 'SIGNUP_CLEAR';

export function signupPending(pending) {
  return {
    type: SIGNUP_PENDING,
    payload: pending,
  };
}

export function signupSuccess(success) {
  return {
    type: SIGNUP_SUCCESS,
    payload: success,
  };
}

export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    payload: error,
  }
}

export function signupClear() {
  return {
    type: SIGNUP_CLEAR,
  };
}

// Testing function
function callSignupApi(state, cb) {
  setTimeout(() => {
    if (state.email === 'admin@example.com' && state.password === 'admin') {
      return cb(null);
    }
    return cb(new Error('Invalid email and/or password'));
  }, 500);
}


export function signup(state, rememberMe) {
  return (dispatch) => {
    dispatch(signupPending(true));
    callSignupApi(state, (error) => {
      if (!error) {
        dispatch(signupSuccess(true));
      } else {
        dispatch(signupError(error));
      }
    });
  }
}
