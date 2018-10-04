import {
  GET_NGO_NOTICE_PENDING, GET_NGO_NOTICE_SUCCESS, GET_NGO_NOTICE_ERROR, GET_NGO_NOTICE_CLEAR,
} from '../actions/getNGONotice';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case GET_NGO_NOTICE_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case GET_NGO_NOTICE_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case GET_NGO_NOTICE_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case GET_NGO_NOTICE_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
