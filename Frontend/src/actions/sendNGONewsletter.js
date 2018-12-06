import axios from 'axios';

export const SEND_NGO_NEWSLETTER_PENDING = 'SEND_NGO_NEWSLETTER_PENDING';
export const SEND_NGO_NEWSLETTER_SUCCESS = 'SEND_NGO_NEWSLETTER_SUCCESS';
export const SEND_NGO_NEWSLETTER_ERROR = 'SEND_NGO_NEWSLETTER_ERROR';
export const SEND_NGO_NEWSLETTER_CLEAR = 'SEND_NGO_NEWSLETTER_CLEAR';

export function sendNGONewsletterPending(pending) {
  return {
    type: SEND_NGO_NEWSLETTER_PENDING,
    payload: pending,
  };
}

export function sendNGONewsletterSuccess(success) {
  return {
    type: SEND_NGO_NEWSLETTER_SUCCESS,
    payload: success,
  };
}

export function sendNGONewsletterError(error) {
  return {
    type: SEND_NGO_NEWSLETTER_ERROR,
    payload: error,
  };
}

export function sendNGONewsletterClear() {
  return {
    type: SEND_NGO_NEWSLETTER_CLEAR,
  };
}

function callSendNGONewsletterApi(id) {
  return new Promise((resolve, reject) => {
    const body = {
        ngoId: id,
    };
    axios.post('http://localhost:3000/ngo/newsletter/send', body)
    .then(response => resolve())
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function sendNGONewsletter(state) {
  const request = callSendNGONewsletterApi(state);
  return dispatch => {
    dispatch(sendNGONewsletterPending(true));
    return request
    .then(() => dispatch(sendNGONewsletterSuccess()))
    .catch(error => dispatch(sendNGONewsletterError(error)));
  };
}
