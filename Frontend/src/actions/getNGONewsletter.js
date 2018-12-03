import axios from 'axios';

export const GET_NGO_NEWSLETTER_PENDING = 'GET_NGO_NEWSLETTER_PENDING';
export const GET_NGO_NEWSLETTER_SUCCESS = 'GET_NGO_NEWSLETTER_SUCCESS';
export const GET_NGO_NEWSLETTER_ERROR = 'GET_NGO_NEWSLETTER_ERROR';
export const GET_NGO_NEWSLETTER_CLEAR = 'GET_NGO_NEWSLETTER_CLEAR';

export function getNGONewsletterPending(pending) {
  return {
    type: GET_NGO_NEWSLETTER_PENDING,
    payload: pending,
  };
}

export function getNGONewsletterSuccess(success) {
    console.log("here success newsletter get" + JSON.stringify(success));
  return {
    type: GET_NGO_NEWSLETTER_SUCCESS,
    payload: success,
  };
}

export function getNGONewsletterError(error) {
  return {
    type: GET_NGO_NEWSLETTER_ERROR,
    payload: error,
  };
}

export function getNGONewsletterClear() {
  return {
    type: GET_NGO_NEWSLETTER_CLEAR,
  };
}

function callGetNGONewsletterApi(id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/ngo/newsletter?id=${id}`)
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function getNGONewsletter(id) {
  const request = callGetNGONewsletterApi(id);
  return dispatch => {
    dispatch(getNGONewsletterPending(true));
    console.log("reached here");
    return request
    .then(response => dispatch(getNGONewsletterSuccess(response)))
    .catch(error => dispatch(getNGONewsletterError(error)));
  };
}

