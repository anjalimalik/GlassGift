export const SEARCH = 'SEARCH';

export function search(value) {
  return {type: SEARCH, value};
}
/*
// Testing function
function callSearchApi(email, password, cb) {
  setTimeout(() => {
    if (email === 'admin@example.com' && password === 'admin') {
      return cb(null);
    }
    return cb(new Error('Invalid email and/or password!'));
  }, 500);
}


export function search(email, password, rememberMe) {
  return (dispatch) => {
    dispatch(searchPending(true));

    // todo
    callSearchApi(email, password, (error) => {
      if (!error) {
        dispatch(searchSuccess(true));
      } else {
        dispatch(searchError(error));
      }
    });
  };
}
*/
