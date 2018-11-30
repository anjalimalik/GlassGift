import {
  UPDATE_NGO_TY_TEMPLATE_PENDING, UPDATE_NGO_TY_TEMPLATE_SUCCESS, UPDATE_NGO_TY_TEMPLATE_ERROR, UPDATE_NGO_TY_TEMPLATE_CLEAR, 
} from '../actions/updateNGOTYTemplate';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case UPDATE_NGO_TY_TEMPLATE_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case UPDATE_NGO_TY_TEMPLATE_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case UPDATE_NGO_TY_TEMPLATE_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case UPDATE_NGO_TY_TEMPLATE_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
