export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_CLEAR = 'LOGIN_CLEAR';

export function loginPending(pending) {
  return {
    type: LOGIN_PENDING,
    pending,
  };
}

export function loginSuccess(success) {
  return {
    type: LOGIN_SUCCESS,
    success,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  }
}

export function loginClear() {
  return {
    type: LOGIN_CLEAR,
  };
}

// Testing function
function callLoginApi(email, password, cb) {
  setTimeout(() => {
    if (email === 'admin@example.com' && password === 'admin') {
      return cb(null);
    }
    return cb(new Error('Invalid email and/or password'));
  }, 500);
}


export function login(email, password, rememberMe) {
  return (dispatch) => {
    callLoginApi(email, password, (error) => {
      // TODO store in LocalStorage if rememberMe
      dispatch(loginPending(false));
      if (!error) {
        dispatch(loginSuccess(true));
      } else {
        dispatch(loginError(error));
      }
    });
  }
}
