import reducer from './login';
import {
  LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_CLEAR,
} from '../actions/login';

describe('Login Reducer', () => {
  it('tests LOGIN_PENDING true', () => {
    const action = {
      type: LOGIN_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests LOGIN_PENDING false', () => {
    const action = {
      type: LOGIN_PENDING,
      payload: false,
    };
    const initialState = {
      pending: true,
      success: false,
      error: null,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: null,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('tests LOGIN_SUCCESS true', () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests LOGIN_SUCCESS false', () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: false,
    };
    const initialState = {
      pending: false,
      success: true,
      error: null,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: null,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('tests LOGIN_ERROR', () => {
    const error = new Error('Error logging in');
    const action = {
      type: LOGIN_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests LOGIN_CLEAR', () => {
    const action = {
      type: LOGIN_CLEAR,
    };
    const initialState = {
      pending: false,
      success: true,
      error: null,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: null,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
