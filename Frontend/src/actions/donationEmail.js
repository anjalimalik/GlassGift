import axios from 'axios';
import { getUserToken } from '../utils';

export const DONATION_EMAIL_PENDING = 'DONATION_EMAIL_PENDING';
export const DONATION_EMAIL_SUCCESS = 'DONATION_EMAIL_SUCCESS';
export const DONATION_EMAIL_ERROR = 'DONATION_EMAIL_ERROR';
export const DONATION_EMAIL_CLEAR = 'DONATION_EMAIL_CLEAR';

export function donationEmailPending(pending) {
  return {
    type: DONATION_EMAIL_PENDING,
    payload: pending,
  };
}

export function donationEmailSuccess(success) {
  return {
    type: DONATION_EMAIL_SUCCESS,
    payload: success,
  };
}

export function donationEmailError(error) {
  return {
    type: DONATION_EMAIL_ERROR,
    payload: error,
  };
}

export function donationEmailClear() {
  return {
    type: DONATION_EMAIL_CLEAR,
  };
}

function callDonationEmailApi(body) {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) reject(new Error("No token!"));
    axios.post('http://localhost:3000/donation/email', body,  { headers: { Authorization: token }})
    .then(response => resolve(response.data))
    .catch(error => { reject(new Error(error.response.data.error || 'Network Error'))});
  });
}


export function donationEmail(body) {
  const request = callDonationEmailApi(body);
  return dispatch => {
    dispatch(donationEmailPending(true));
    return request
    .then(response => dispatch(donationEmailSuccess(response)))
    .catch(error => dispatch(donationEmailError(error)));
  };
}
