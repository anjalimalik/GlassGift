import configureStore from 'redux-mock-store';
import {
  CONFIRM_EMAIL_PENDING, CONFIRM_EMAIL_SUCCESS, CONFIRM_EMAIL_ERROR, CONFIRM_EMAIL_CLEAR,
  confirmEmailPending, confirmEmailSuccess, confirmEmailError, confirmEmailClear,
} from '../../actions/confirmEmail';

const mockStore = configureStore();
const store = mockStore();

describe('Confirm Email Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests CONFIRM_EMAIL_PENDING true', () => {
    const expectedActions = [{
      type: CONFIRM_EMAIL_PENDING,
      payload: true,
    }];
    store.dispatch(confirmEmailPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests CONFIRM_EMAIL_PENDING false', () => {
    const expectedActions = [{
      type: CONFIRM_EMAIL_PENDING,
      payload: false,
    }];
    store.dispatch(confirmEmailPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests CONFIRM_EMAIL_SUCCESS true', () => {
    const expectedActions = [{
      type: CONFIRM_EMAIL_SUCCESS,
      payload: true,
    }];
    store.dispatch(confirmEmailSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests CONFIRM_EMAIL_SUCCESS false', () => {
    const expectedActions = [{
      type: CONFIRM_EMAIL_SUCCESS,
      payload: false,
    }];
    store.dispatch(confirmEmailSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests CONFIRM_EMAIL_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const expectedActions = [{
      type: CONFIRM_EMAIL_ERROR,
      payload: error,
    }];
    store.dispatch(confirmEmailError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests CONFIRM_EMAIL_CLEAR', () => {
    const expectedActions = [{
      type: CONFIRM_EMAIL_CLEAR,
    }];
    store.dispatch(confirmEmailClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
