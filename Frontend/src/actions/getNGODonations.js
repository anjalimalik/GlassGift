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

// function callGetNGODonationsApi(id) {
//   return new Promise((resolve, reject) => {
//     axios.get(`http://localhost:3000/ngo/export_transactions?id=${id}`)
//     .then(response => resolve(response.data))
//     .catch(error => reject(new Error(error.response.data.error)));
//   });
// }

// export function getNGODonations(id) {
//   const request = callGetNGODonationsApi(id);
//   return dispatch => {
//     dispatch(getNGODonationsPending(true));
//     return request
//     .then(response => dispatch(getNGODonationsSuccess(response)))
//     .catch(error => dispatch(getNGODonationsError(error)));
//   };
// }

const donations = [
  {
    id: 1,
    donorId: 1,
    ngoId: 1,
    amount: 1,
    message: 'test1',
    anonymous: false,
    type: 1,
    honoredUserId: 1,
    honoredUserName: 'test1',
    created: Date.now(),
  },
  {
    id: 2,
    donorId: 2,
    ngoId: 2,
    amount: 2,
    message: 'test2',
    anonymous: true,
    type: 2,
    honoredUserId: 2,
    honoredUserName: 'test2',
    created: Date.now(),
  },
  {
    id: 3,
    donorId: 3,
    ngoId: 3,
    amount: 3,
    message: 'test3',
    anonymous: false,
    type: 3,
    honoredUserId: 3,
    honoredUserName: 'test3',
    created: Date.now(),
  },
];

export function getNGODonations(id) {
  return dispatch => {
    dispatch(getNGODonationsPending(true));
    setTimeout(dispatch(getNGODonationsSuccess(donations)), 500);
  };
}