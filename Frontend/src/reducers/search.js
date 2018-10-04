import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_CLEAR, SEARCH } from '../actions/search';

export default function reducer(state = {  
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case SEARCH: {
      return { ...state, data: action.data };
    }
    case SEARCH_PENDING:
    return {
      pending: action.payload,
      success: false,
      error: null,
    };
  case SEARCH_SUCCESS:
    return {
      pending: false,
      success: action.payload,
      error: null,
    };
  case SEARCH_ERROR:
    return {
      pending: false,
      success: false,
      error: action.payload.message,
    };
  case SEARCH_CLEAR:
    return {
      pending: false,
      success: false,
      error: null,
    };
    default:
      return state;
  }
}