import { FORGOT_PASSWORD_PENDING, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_CLEAR } from '../actions/forgotPassword';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_PENDING:
      return {
        pending: true,
        success: false,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        pending: false,
        success: true,
        error: null,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        pending: false,
        success: false,
        error: action.error.message,
      };
    case FORGOT_PASSWORD_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
