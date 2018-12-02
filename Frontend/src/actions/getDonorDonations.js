import axios from 'axios';

export const GET_DONOR_DONATIONS_PENDING = 'GET_DONOR_DONATIONS_PENDING';
export const GET_DONOR_DONATIONS_SUCCESS = 'GET_DONOR_DONATIONS_SUCCESS';
export const GET_DONOR_DONATIONS_ERROR = 'GET_DONOR_DONATIONS_ERROR';
export const GET_DONOR_DONATIONS_CLEAR = 'GET_DONOR_DONATIONS_CLEAR';

export function getDonorDonationsPending(pending) {
  return {
    type: GET_DONOR_DONATIONS_PENDING,
    payload: pending,
  };
}

export function getDonorDonationsSuccess(success) {
  return {
    type: GET_DONOR_DONATIONS_SUCCESS,
    payload: success,
  };
}

export function getDonorDonationsError(error) {
  return {
    type: GET_DONOR_DONATIONS_ERROR,
    payload: error,
  };
}

export function getDonorDonationsClear() {
  return {
    type: GET_DONOR_DONATIONS_CLEAR,
  };
}

// function callgetDonorDonationsApi(id) {
//   return new Promise((resolve, reject) => {
//     axios.get(`http://localhost:3000/ngo/export_transactions?id=${id}`)
//     .then(response => resolve(response.data))
//     .catch(error => reject(new Error(error.response.data.error)));
//   });
// }

// export function getDonorDonations(id) {
//   const request = callgetDonorDonationsApi(id);
//   return dispatch => {
//     dispatch(getDonorDonationsPending(true));
//     return request
//     .then(response => dispatch(getDonorDonationsSuccess(response)))
//     .catch(error => dispatch(getDonorDonationsError(error)));
//   };
// }

const donations = [
  {
    id: '1',
    donorId: '1',
    ngoId: '1',
    amount: 1,
    message: 'test1',
    anonymous: false,
    type: 1,
    honoredUserId: '1',
    honoredUserName: 'test1',
    created: Date.now(),
  },
  {
    id: '2',
    donorId: '2',
    ngoId: '2',
    amount: 2,
    message: 'test2',
    anonymous: true,
    type: 2,
    honoredUserId: '2',
    honoredUserName: 'test2',
    created: Date.now(),
  },
  {
    id: '3',
    donorId: '3',
    ngoId: '3',
    amount: 3,
    message: 'test3',
    anonymous: false,
    type: 3,
    honoredUserId: 3,
    honoredUserName: 'test3',
    created: Date.now(),
  },
];

export function getDonorDonations(id) {
  return dispatch => {
    dispatch(getDonorDonationsPending(true));
    setTimeout(dispatch(getDonorDonationsSuccess(donations)), 500);
  };
}