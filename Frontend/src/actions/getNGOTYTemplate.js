import axios from 'axios';

export const GET_NGO_TY_TEMPLATE_PENDING = 'GET_NGO_TY_TEMPLATE_PENDING';
export const GET_NGO_TY_TEMPLATE_SUCCESS = 'GET_NGO_TY_TEMPLATE_SUCCESS';
export const GET_NGO_TY_TEMPLATE_ERROR = 'GET_NGO_TY_TEMPLATE_ERROR';
export const GET_NGO_TY_TEMPLATE_CLEAR = 'GET_NGO_TY_TEMPLATE_CLEAR';

export function getNGOTYTemplatePending(pending) {
  return {
    type: GET_NGO_TY_TEMPLATE_PENDING,
    payload: pending,
  };
}

export function getNGOTYTemplateSuccess(success) {
  return {
    type: GET_NGO_TY_TEMPLATE_SUCCESS,
    payload: success,
  };
}

export function getNGOTYTemplateError(error) {
  return {
    type: GET_NGO_TY_TEMPLATE_ERROR,
    payload: error,
  };
}

export function getNGOTYTemplateClear() {
  return {
    type: GET_NGO_TY_TEMPLATE_CLEAR,
  };
}

function callGetNGOTYTemplateApi(id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/ngo/emailtemplate?id=${id}`)
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error.response.data.error)));
  });
}

export function getNGOTYTemplate(id) {
  const request = callGetNGOTYTemplateApi(id);
  return dispatch => {
    dispatch(getNGOTYTemplatePending(true));
    return request
    .then(response => dispatch(getNGOTYTemplateSuccess(response)))
    .catch(error => dispatch(getNGOTYTemplateError(error)));
  };
}
