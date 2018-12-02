import { GET_SEARCHES_PENDING, GET_SEARCHES_SUCCESS, GET_SEARCHES_ERROR, GET_SEARCHES_CLEAR } from '../actions/getSearches';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch (action.type) {
    case GET_SEARCHES_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case GET_SEARCHES_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case GET_SEARCHES_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case GET_SEARCHES_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
