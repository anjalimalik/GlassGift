import {
    UPDATE_NGO_NEWSLETTER_PENDING, UPDATE_NGO_NEWSLETTER_SUCCESS, UPDATE_NGO_NEWSLETTER_ERROR, UPDATE_NGO_NEWSLETTER_CLEAR, 
  } from '../actions/updateNGONewsletter';
  
  export default function reducer(state = {
    pending: false,
    success: false,
    error: null,
  }, action) {
    switch(action.type) {
      case UPDATE_NGO_NEWSLETTER_PENDING:
        return {
          pending: action.payload,
          success: false,
          error: null,
        };
      case UPDATE_NGO_NEWSLETTER_SUCCESS:
        return {
          pending: false,
          success: action.payload,
          error: null,
        };
      case UPDATE_NGO_NEWSLETTER_ERROR:
        return {
          pending: false,
          success: false,
          error: action.payload.message,
        };
      case UPDATE_NGO_NEWSLETTER_CLEAR:
        return {
          pending: false,
          success: false,
          error: null,
        };
      default:
        return state;
    }
  }
  