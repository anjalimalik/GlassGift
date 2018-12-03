import { GET_CAL_DATA_PENDING, GET_CAL_DATA_SUCCESS, GET_CAL_DATA_ERROR, GET_CAL_DATA_CLEAR } from '../actions/getCalData';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case GET_CAL_DATA_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case GET_CAL_DATA_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case GET_CAL_DATA_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case GET_CAL_DATA_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
