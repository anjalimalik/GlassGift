import { SEND_NGO_NEWSLETTER_PENDING, SEND_NGO_NEWSLETTER_SUCCESS, SEND_NGO_NEWSLETTER_ERROR, SEND_NGO_NEWSLETTER_CLEAR } from '../actions/sendNGONewsletter';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch (action.type) {
    case SEND_NGO_NEWSLETTER_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case SEND_NGO_NEWSLETTER_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case SEND_NGO_NEWSLETTER_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case SEND_NGO_NEWSLETTER_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
