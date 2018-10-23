import {
  DONATE_PENDING, DONATE_SUCCESS, DONATE_ERROR, DONATE_CLEAR,
} from '../actions/donate';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch (action.type) {
    case DONATE_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case DONATE_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case DONATE_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case DONATE_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
