import {
  CONFIRM_EMAIL_PENDING, CONFIRM_EMAIL_SUCCESS, CONFIRM_EMAIL_ERROR, CONFIRM_EMAIL_CLEAR,
} from '../actions/confirmEmail';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch (action.type) {
    case CONFIRM_EMAIL_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case CONFIRM_EMAIL_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case CONFIRM_EMAIL_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case CONFIRM_EMAIL_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
