import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_CLEAR } from '../actions/login';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        pending: true,
        success: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        pending: false,
        success: true,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        pending: false,
        success: false,
        error: action.error.message,
      };
    case LOGIN_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
