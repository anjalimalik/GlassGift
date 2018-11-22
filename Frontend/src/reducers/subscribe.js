import {
    SUBSCRIBE_PENDING, SUBSCRIBE_SUCCESS, SUBSCRIBE_ERROR, SUBSCRIBE_CLEAR,
  } from '../actions/subscribe';
  
  export default function reducer(state = {
    pending: false,
    success: false,
    error: null,
  }, action) {
    switch (action.type) {
      case SUBSCRIBE_PENDING:
        return {
          pending: action.payload,
          success: false,
          error: null,
        };
      case SUBSCRIBE_SUCCESS:
        return {
          pending: false,
          success: action.payload,
          error: null,
        };
      case SUBSCRIBE_ERROR:
        return {
          pending: false,
          success: false,
          error: action.payload.message,
        };
      case SUBSCRIBE_CLEAR:
        return {
          pending: false,
          success: false,
          error: null,
        };
      default:
        return state;
    }
  }
  