import reducer from '../../reducers/donate';
import {
  DONATE_PENDING, DONATE_SUCCESS, DONATE_ERROR, DONATE_CLEAR,
} from '../../actions/donate';

describe('Confirm Email Reducer', () => {
  it('tests DONATE_PENDING true', () => {
    const action = {
      type: DONATE_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests DONATE_PENDING false', () => {
    const action = {
      type: DONATE_PENDING,
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

  it('tests DONATE_SUCCESS true', () => {
    const action = {
      type: DONATE_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests DONATE_SUCCESS false', () => {
    const action = {
      type: DONATE_SUCCESS,
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

  it('tests DONATE_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const action = {
      type: DONATE_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests DONATE_CLEAR', () => {
    const action = {
      type: DONATE_CLEAR,
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
