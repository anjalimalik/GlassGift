import { SIGNUP_PENDING, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_CLEAR } from '../actions/signup';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch (action.type) {
    case SIGNUP_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case SIGNUP_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case SIGNUP_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
