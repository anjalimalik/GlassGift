import configureStore from 'redux-mock-store';
import {
  LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_CLEAR,
  loginPending, loginSuccess, loginError, loginClear,
} from './login';

const mockStore = configureStore();
const store = mockStore();

describe('Login Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests LOGIN_PENDING true', () => {
    const expectedActions = [{
      type: LOGIN_PENDING,
      payload :true,
    }];
    store.dispatch(loginPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests LOGIN_PENDING false', () => {
    const expectedActions = [{
      type: LOGIN_PENDING,
      payload :false,
    }];
    store.dispatch(loginPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests LOGIN_SUCCESS true', () => {
    const expectedActions = [{
      type: LOGIN_SUCCESS,
      payload :true,
    }];
    store.dispatch(loginSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests LOGIN_SUCCESS false', () => {
    const expectedActions = [{
      type: LOGIN_SUCCESS,
      payload :false,
    }];
    store.dispatch(loginSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests LOGIN_ERROR', () => {
    const error = new Error('Invalid email and/or password!');
    const expectedActions = [{
      type: LOGIN_ERROR,
      payload: error,
    }];
    store.dispatch(loginError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests LOGIN_CLEAR', () => {
    const expectedActions = [{
      type: LOGIN_CLEAR,
    }];
    store.dispatch(loginClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
