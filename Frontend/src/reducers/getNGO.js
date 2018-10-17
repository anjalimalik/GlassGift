import { GET_NGO_PENDING, GET_NGO_SUCCESS, GET_NGO_ERROR, GET_NGO_CLEAR } from '../actions/getNGO';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case GET_NGO_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case GET_NGO_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case GET_NGO_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case GET_NGO_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
