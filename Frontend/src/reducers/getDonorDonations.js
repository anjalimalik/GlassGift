import { GET_DONOR_DONATIONS_PENDING, GET_DONOR_DONATIONS_SUCCESS, GET_DONOR_DONATIONS_ERROR, GET_DONOR_DONATIONS_CLEAR } from '../actions/getDonorDonations';

export default function reducer(state = {
  pending: false,
  success: false,
  error: null,
}, action) {
  switch(action.type) {
    case GET_DONOR_DONATIONS_PENDING:
      return {
        pending: action.payload,
        success: false,
        error: null,
      };
    case GET_DONOR_DONATIONS_SUCCESS:
      return {
        pending: false,
        success: action.payload,
        error: null,
      };
    case GET_DONOR_DONATIONS_ERROR:
      return {
        pending: false,
        success: false,
        error: action.payload.message,
      };
    case GET_DONOR_DONATIONS_CLEAR:
      return {
        pending: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
}
