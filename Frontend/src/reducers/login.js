import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/login';

export default function reducer(state = {
  loginPending: false,
  loginSuccess: false,
  loginError: null,
}, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return Object.assign({}, state, {
        loginPending: action.loginPending,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loginSuccess: action.loginSuccess,
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError,
      });
    default:
      return state;
  }
}
