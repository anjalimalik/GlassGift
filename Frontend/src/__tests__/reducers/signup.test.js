import reducer from '../../reducers/signup';
import {
  SIGNUP_PENDING, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_CLEAR,
} from '../../actions/signup';

describe('Forgot Password Reducer', () => {
  it('tests SIGNUP_PENDING true', () => {
    const action = {
      type: SIGNUP_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests SIGNUP_PENDING false', () => {
    const action = {
      type: SIGNUP_PENDING,
      payload: false,
    };
    const initialState = {
      pending: false,
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

  it('tests SIGNUP_SUCCESS true', () => {
    const action = {
      type: SIGNUP_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests SIGNUP_ERROR', () => {
    const error = new Error('Error signing up!');
    const action = {
      type: SIGNUP_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests SIGNUP_CLEAR', () => {
    const action = {
      type: SIGNUP_CLEAR,
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

  it('tests default case', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 'test',
    };
    const expectedState = {
      error: null,
      pending: false,
      success: false,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});
