// http://jslancer.com/blog/2017/04/27/a-simple-login-flow-with-react-and-redux/

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

function setLoginPending(loginPending) {
  return {
    type: LOGIN_PENDING,
    loginPending,
  };
}

function setLoginSuccess(loginSuccess) {
  return {
    type: LOGIN_SUCCESS,
    loginSuccess,
  };
}

function setLoginError(loginError) {
  return {
    type: LOGIN_ERROR,
    loginError,
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
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

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
