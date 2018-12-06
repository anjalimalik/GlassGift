import axios from 'axios';
import { getUserToken } from '../utils';

export const UPDATE_NGO_TY_TEMPLATE_PENDING = 'UPDATE_NGO_TY_TEMPLATE_PENDING';
export const UPDATE_NGO_TY_TEMPLATE_SUCCESS = 'UPDATE_NGO_TY_TEMPLATE_SUCCESS';
export const UPDATE_NGO_TY_TEMPLATE_ERROR = 'UPDATE_NGO_TY_TEMPLATE_ERROR';
export const UPDATE_NGO_TY_TEMPLATE_CLEAR = 'UPDATE_NGO_TY_TEMPLATE_CLEAR';

export function updateNGOTYTemplatePending(pending) {
  return {
    type: UPDATE_NGO_TY_TEMPLATE_PENDING,
    payload: pending,
  };
}

export function updateNGOTYTemplateSuccess(success) {
  return {
    type: UPDATE_NGO_TY_TEMPLATE_SUCCESS,
    payload: success,
  };
}

export function updateNGOTYTemplateError(error) {
  return {
    type: UPDATE_NGO_TY_TEMPLATE_ERROR,
    payload: error,
  };
}

export function updateNGOTYTemplateClear() {
  return {
    type: UPDATE_NGO_TY_TEMPLATE_CLEAR,
  };
}

function callUpdateNGOTYTemplateApi(emailTemplate, ngoId) {
  return new Promise((resolve, reject) => {
    const token = getUserToken();
    if (!token) reject(new Error("No token!"));
    const body = {
      emailTemplate,
      ngoId
    };
    axios.put('http://localhost:3000/ngo/email', body, { headers: { Authorization: token }})
    .then(response => resolve())
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function updateNGOTYTemplate(emailTemplate, ngoId) {
  const request = callUpdateNGOTYTemplateApi(emailTemplate, ngoId);
  return dispatch => {
    dispatch(updateNGOTYTemplatePending(true));
    return request
    .then(() => dispatch(updateNGOTYTemplateSuccess()))
    .catch(error => dispatch(updateNGOTYTemplateError(error)));
  };
}
