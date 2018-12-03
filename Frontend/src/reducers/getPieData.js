import { GET_PIE_DATA_PENDING, GET_PIE_DATA_SUCCESS, GET_PIE_DATA_ERROR, GET_PIE_DATA_CLEAR } from '../actions/getPieData';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case GET_PIE_DATA_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case GET_PIE_DATA_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case GET_PIE_DATA_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case GET_PIE_DATA_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
