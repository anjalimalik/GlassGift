import reducer from '../../reducers/resetPassword';
import {
  RESET_PASSWORD_PENDING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, RESET_PASSWORD_CLEAR,
} from '../../actions/resetPassword';

describe('Forgot Password Reducer', () => {
  it('tests RESET_PASSWORD_PENDING true', () => {
    const action = {
      type: RESET_PASSWORD_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests RESET_PASSWORD_PENDING false', () => {
    const action = {
      type: RESET_PASSWORD_PENDING,
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

  it('tests RESET_PASSWORD_SUCCESS true', () => {
    const action = {
      type: RESET_PASSWORD_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests RESET_PASSWORD_SUCCESS false', () => {
    const action = {
      type: RESET_PASSWORD_SUCCESS,
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

  it('tests RESET_PASSWORD_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const action = {
      type: RESET_PASSWORD_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests RESET_PASSWORD_CLEAR', () => {
    const action = {
      type: RESET_PASSWORD_CLEAR,
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
