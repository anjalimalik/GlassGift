import {
  UPDATE_NGO_NOTICE_PENDING, UPDATE_NGO_NOTICE_SUCCESS, UPDATE_NGO_NOTICE_ERROR, UPDATE_NGO_NOTICE_CLEAR, 
} from '../actions/updateNGONotice';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case UPDATE_NGO_NOTICE_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case UPDATE_NGO_NOTICE_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case UPDATE_NGO_NOTICE_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case UPDATE_NGO_NOTICE_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
