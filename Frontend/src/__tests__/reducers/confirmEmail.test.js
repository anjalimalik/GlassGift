import reducer from '../../reducers/confirmEmail';
import {
  CONFIRM_EMAIL_PENDING, CONFIRM_EMAIL_SUCCESS, CONFIRM_EMAIL_ERROR, CONFIRM_EMAIL_CLEAR,
} from '../../actions/confirmEmail';

describe('Forgot Password Reducer', () => {
  it('tests CONFIRM_EMAIL_PENDING true', () => {
    const action = {
      type: CONFIRM_EMAIL_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests CONFIRM_EMAIL_PENDING false', () => {
    const action = {
      type: CONFIRM_EMAIL_PENDING,
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

  it('tests CONFIRM_EMAIL_SUCCESS true', () => {
    const action = {
      type: CONFIRM_EMAIL_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests CONFIRM_EMAIL_SUCCESS false', () => {
    const action = {
      type: CONFIRM_EMAIL_SUCCESS,
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

  it('tests CONFIRM_EMAIL_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const action = {
      type: CONFIRM_EMAIL_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests CONFIRM_EMAIL_CLEAR', () => {
    const action = {
      type: CONFIRM_EMAIL_CLEAR,
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
