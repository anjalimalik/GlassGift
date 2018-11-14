import {
  DONATION_EMAIL_PENDING, DONATION_EMAIL_SUCCESS, DONATION_EMAIL_ERROR, DONATION_EMAIL_CLEAR,
} from '../actions/donationEmail';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch (action.type) {
    case DONATION_EMAIL_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case DONATION_EMAIL_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case DONATION_EMAIL_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case DONATION_EMAIL_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
