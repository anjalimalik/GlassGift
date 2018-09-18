import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  RESET_PASSWORD_PENDING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, RESET_PASSWORD_CLEAR,
  resetPasswordPending, resetPasswordSuccess, resetPasswordError, resetPasswordClear,
} from './resetPassword';

const mockStore = configureStore();
const store = mockStore();

describe('Reset Password Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests RESET_PASSWORD_PENDING true', () => {
    const expectedActions = [{
      type: RESET_PASSWORD_PENDING,
      payload: true,
    }];
    store.dispatch(resetPasswordPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests RESET_PASSWORD_PENDING false', () => {
    const expectedActions = [{
      type: RESET_PASSWORD_PENDING,
      payload: false,
    }];
    store.dispatch(resetPasswordPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests RESET_PASSWORD_SUCCESS true', () => {
    const expectedActions = [{
      type: RESET_PASSWORD_SUCCESS,
      payload: true,
    }];
    store.dispatch(resetPasswordSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests RESET_PASSWORD_SUCCESS false', () => {
    const expectedActions = [{
      type: RESET_PASSWORD_SUCCESS,
      payload: false,
    }];
    store.dispatch(resetPasswordSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests RESET_PASSWORD_ERROR', () => {
    const error = new Error('Invalid email and/or password');
    const expectedActions = [{
      type: RESET_PASSWORD_ERROR,
      payload: error,
    }];
    store.dispatch(resetPasswordError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests RESET_PASSWORD_CLEAR', () => {
    const expectedActions = [{
      type: RESET_PASSWORD_CLEAR,
    }];
    store.dispatch(resetPasswordClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
