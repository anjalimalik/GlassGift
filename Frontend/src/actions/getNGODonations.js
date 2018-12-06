import axios from 'axios';

export const GET_NGO_DONATIONS_PENDING = 'GET_NGO_DONATIONS_PENDING';
export const GET_NGO_DONATIONS_SUCCESS = 'GET_NGO_DONATIONS_SUCCESS';
export const GET_NGO_DONATIONS_ERROR = 'GET_NGO_DONATIONS_ERROR';
export const GET_NGO_DONATIONS_CLEAR = 'GET_NGO_DONATIONS_CLEAR';

export function getNGODonationsPending(pending) {
  return {
    type: GET_NGO_DONATIONS_PENDING,
    payload: pending,
  };
}

export function getNGODonationsSuccess(success) {
  return {
    type: GET_NGO_DONATIONS_SUCCESS,
    payload: success,
  };
}

export function getNGODonationsError(error) {
  return {
    type: GET_NGO_DONATIONS_ERROR,
    payload: error,
  };
}

export function getNGODonationsClear() {
  return {
    type: GET_NGO_DONATIONS_CLEAR,
  };
}

function callGetNGODonationsApi(id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/donation/?id=${id}&by=ngo`)
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function getNGODonations(id) {
  const request = callGetNGODonationsApi(id);
  return dispatch => {
    dispatch(getNGODonationsPending(true));
    return request
    .then(response => dispatch(getNGODonationsSuccess(response)))
    .catch(error => dispatch(getNGODonationsError(error)));
  };
}
