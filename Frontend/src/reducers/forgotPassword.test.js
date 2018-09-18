import reducer from './forgotPassword';
import {
  FORGOT_PASSWORD_PENDING, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_CLEAR,
} from '../actions/forgotPassword';

describe('Forgot Password Reducer', () => {
  it('tests FORGOT_PASSWORD_PENDING true', () => {
    const action = {
      type: FORGOT_PASSWORD_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests FORGOT_PASSWORD_PENDING false', () => {
    const action = {
      type: FORGOT_PASSWORD_PENDING,
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

  it('tests FORGOT_PASSWORD_SUCCESS true', () => {
    const action = {
      type: FORGOT_PASSWORD_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests FORGOT_PASSWORD_SUCCESS false', () => {
    const action = {
      type: FORGOT_PASSWORD_SUCCESS,
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

  it('tests FORGOT_PASSWORD_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const action = {
      type: FORGOT_PASSWORD_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests FORGOT_PASSWORD_CLEAR', () => {
    const action = {
      type: FORGOT_PASSWORD_CLEAR,
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
