import configureStore from 'redux-mock-store';
import {
  FORGOT_PASSWORD_PENDING, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_CLEAR,
  forgotPasswordPending, forgotPasswordSuccess, forgotPasswordError, forgotPasswordClear,
} from '../../actions/forgotPassword';

const mockStore = configureStore();
const store = mockStore();

describe('Forgot Password Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests FORGOT_PASSWORD_PENDING true', () => {
    const expectedActions = [{
      type: FORGOT_PASSWORD_PENDING,
      payload: true,
    }];
    store.dispatch(forgotPasswordPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests FORGOT_PASSWORD_PENDING false', () => {
    const expectedActions = [{
      type: FORGOT_PASSWORD_PENDING,
      payload: false,
    }];
    store.dispatch(forgotPasswordPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests FORGOT_PASSWORD_SUCCESS true', () => {
    const expectedActions = [{
      type: FORGOT_PASSWORD_SUCCESS,
      payload: true,
    }];
    store.dispatch(forgotPasswordSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests FORGOT_PASSWORD_SUCCESS false', () => {
    const expectedActions = [{
      type: FORGOT_PASSWORD_SUCCESS,
      payload: false,
    }];
    store.dispatch(forgotPasswordSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests FORGOT_PASSWORD_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const expectedActions = [{
      type: FORGOT_PASSWORD_ERROR,
      payload: error,
    }];
    store.dispatch(forgotPasswordError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests FORGOT_PASSWORD_CLEAR', () => {
    const expectedActions = [{
      type: FORGOT_PASSWORD_CLEAR,
    }];
    store.dispatch(forgotPasswordClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
