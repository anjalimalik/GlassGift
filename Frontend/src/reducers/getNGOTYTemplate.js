import {
  GET_NGO_TY_TEMPLATE_PENDING, GET_NGO_TY_TEMPLATE_SUCCESS, GET_NGO_TY_TEMPLATE_ERROR, GET_NGO_TY_TEMPLATE_CLEAR,
} from '../actions/getNGOTYTemplate';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case GET_NGO_TY_TEMPLATE_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case GET_NGO_TY_TEMPLATE_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case GET_NGO_TY_TEMPLATE_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case GET_NGO_TY_TEMPLATE_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
