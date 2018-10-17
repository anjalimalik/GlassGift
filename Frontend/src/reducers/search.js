import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_CLEAR } from '../actions/search';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
  rows: [],
}, action) {
  switch(action.type) {
    case SEARCH_PENDING:
    return {
      pending: action.payload,
      success: false,
      error: null,
      rows: [],
    };
  case SEARCH_SUCCESS:
    return {
      pending: false,
      success: true,
      error: null,
      rows: action.payload,
    };
  case SEARCH_ERROR:
    return {
      pending: false,
      success: false,
      error: action.payload.message,
      rows: [],
    };
  case SEARCH_CLEAR:
    return {
      pending: false,
      success: false,
      error: null,
      rows: [],
    };
    default:
      return state;
  }
}