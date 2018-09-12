export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

function setLoginPending(pending) {
  return {
    type: LOGIN_PENDING,
    pending,
  };
}

function setLoginSuccess(success) {
  return {
    type: LOGIN_SUCCESS,
    success,
  };
}

function setLoginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  }
}

// Testing function
function callLoginApi(email, password, cb) {
  setTimeout(() => {
    if (email === 'admin@example.com' && password === 'admin') {
      return cb(null);
    }
    return cb(new Error('Invalid email and password'));
  }, 500);
}


export function login(email, password) {
  return (dispatch) => {
    callLoginApi(email, password, (error) => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}
