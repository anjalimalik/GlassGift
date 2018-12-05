import axios from 'axios';

export const UPDATE_NGO_NEWSLETTER_PENDING = 'UPDATE_NGO_NEWSLETTER_PENDING';
export const UPDATE_NGO_NEWSLETTER_SUCCESS = 'UPDATE_NGO_NEWSLETTER_SUCCESS';
export const UPDATE_NGO_NEWSLETTER_ERROR = 'UPDATE_NGO_NEWSLETTER_ERROR';
export const UPDATE_NGO_NEWSLETTER_CLEAR = 'UPDATE_NGO_NEWSLETTER_CLEAR';

export function updateNGONewsletterPending(pending) {
  return {
    type: UPDATE_NGO_NEWSLETTER_PENDING,
    payload: pending,
  };
}

export function updateNGONewsletterSuccess(success) {
  return {
    type: UPDATE_NGO_NEWSLETTER_SUCCESS,
    payload: success,
  };
}

export function updateNGONewsletterError(error) {
  return {
    type: UPDATE_NGO_NEWSLETTER_ERROR,
    payload: error,
  };
}

export function updateNGONewsletterClear() {
  return {
    type: UPDATE_NGO_NEWSLETTER_CLEAR,
  };
}

function callUpdateNGONewsletterApi(id, newsletter) {
  return new Promise((resolve, reject) => {
    const body = {
        ngoId: id,
        newsletter,
    };
    axios.post('http://localhost:3000/ngo/newsletter', body)
    .then(response => resolve())
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function updateNGONewsletter(id, newsletter) {
  const request = callUpdateNGONewsletterApi(id, newsletter);
  return dispatch => {
    dispatch(updateNGONewsletterPending(true));
    return request
    .then(() => dispatch(updateNGONewsletterSuccess()))
    .catch(error => dispatch(updateNGONewsletterError(error)));
  };
}
