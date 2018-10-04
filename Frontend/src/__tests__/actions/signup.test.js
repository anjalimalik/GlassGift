import configureStore from 'redux-mock-store';
import {
  SIGNUP_PENDING, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_CLEAR,
  signupPending, signupSuccess, signupError, signupClear,
} from '../../actions/signup';

const mockStore = configureStore();
const store = mockStore();

describe('Signup Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests SIGNUP_PENDING true', () => {
    const expectedActions = [{
      type: SIGNUP_PENDING,
      payload: true,
    }];
    store.dispatch(signupPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SIGNUP_PENDING false', () => {
    const expectedActions = [{
      type: SIGNUP_PENDING,
      payload: false,
    }];
    store.dispatch(signupPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SIGNUP_SUCCESS true', () => {
    const expectedActions = [{
      type: SIGNUP_SUCCESS,
      payload: true,
    }];
    store.dispatch(signupSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SIGNUP_SUCCESS false', () => {
    const expectedActions = [{
      type: SIGNUP_SUCCESS,
      payload: false,
    }];
    store.dispatch(signupSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SIGNUP_ERROR', () => {
    const error = new Error('Invalid email and/or password');
    const expectedActions = [{
      type: SIGNUP_ERROR,
      payload: error,
    }];
    store.dispatch(signupError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SIGNUP_CLEAR', () => {
    const expectedActions = [{
      type: SIGNUP_CLEAR,
    }];
    store.dispatch(signupClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
