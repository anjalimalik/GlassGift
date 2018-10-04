import {
  RESET_PASSWORD_PENDING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, RESET_PASSWORD_CLEAR,
} from '../actions/resetPassword';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch (action.type) {
    case RESET_PASSWORD_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case RESET_PASSWORD_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case RESET_PASSWORD_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
