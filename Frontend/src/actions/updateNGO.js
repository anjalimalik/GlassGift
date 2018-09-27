export const UPDATE_NGO_PENDING = 'UPDATE_NGO_PENDING';
export const UPDATE_NGO_SUCCESS = 'UPDATE_NGO_SUCCESS';
export const UPDATE_NGO_ERROR = 'UPDATE_NGO_ERROR';
export const UPDATE_NGO_CLEAR = 'UPDATE_NGO_CLEAR';

export function updateNGOPending(pending) {
  return {
    type: UPDATE_NGO_PENDING,
    payload: pending,
  };
}

export function updateNGOSuccess(success) {
  return {
    type: UPDATE_NGO_SUCCESS,
    payload: success,
  };
}

export function updateNGOError(error) {
  return {
    type: UPDATE_NGO_ERROR,
    payload: error,
  };
}

export function updateNGOClear() {
  return {
    type: UPDATE_NGO_CLEAR,
  };
}

// Testing function
function callUpdateNGOApi(state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Failed to update!'));
    }, 500);
  });
}

// TODO change other action creators to use Promises
export function updateNGO(state) {
  return dispatch => {
    dispatch(updateNGOPending(true));
    return callUpdateNGOApi(state).then(
      result => {
        dispatch(updateNGOSuccess(true));
      },
      error => {
        dispatch(updateNGOError(error));
      }
    );
  };
}
