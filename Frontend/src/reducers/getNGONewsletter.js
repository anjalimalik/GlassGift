import {
    GET_NGO_NEWSLETTER_PENDING, GET_NGO_NEWSLETTER_SUCCESS, GET_NGO_NEWSLETTER_ERROR, GET_NGO_NEWSLETTER_CLEAR,
  } from '../actions/getNGONewsletter';
  
  export default function reducer(state = {
    pending: false,
    success: false,
    error: null,
  }, action) {
      console.log("action type newsletter get : " + action.type);
    switch(action.type) {
      case GET_NGO_NEWSLETTER_PENDING:
        return {
          pending: action.payload,
          success: false,
          error: null,
        };
      case GET_NGO_NEWSLETTER_SUCCESS:
      console.log("newsletter reducers success: " + JSON.stringify(action.payload));
        return {
          pending: false,
          success: action.payload,
          error: null,
        };
      case GET_NGO_NEWSLETTER_ERROR:
        return {
          pending: false,
          success: false,
          error: action.payload.message,
        };
      case GET_NGO_NEWSLETTER_CLEAR:
        return {
          pending: false,
          success: false,
          error: null,
        };
      default:
        return state;
    }
  }
  