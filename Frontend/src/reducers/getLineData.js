import { GET_LINE_DATA_PENDING, GET_LINE_DATA_SUCCESS, GET_LINE_DATA_ERROR, GET_LINE_DATA_CLEAR } from '../actions/getLineData';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case GET_LINE_DATA_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case GET_LINE_DATA_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case GET_LINE_DATA_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case GET_LINE_DATA_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
