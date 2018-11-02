import reducer from '../../reducers/search';
import {
  SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_CLEAR,
} from '../../actions/search';

describe('Confirm Email Reducer', () => {
  it('tests SEARCH_PENDING true', () => {
    const action = {
      type: SEARCH_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
      rows: [],
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests SEARCH_PENDING false', () => {
    const action = {
      type: SEARCH_PENDING,
      payload: false,
    };
    const initialState = {
      pending: true,
      success: false,
      error: null,
      rows: [],
    };
    const expectedState = {
      pending: false,
      success: false,
      error: null,
      rows: [],
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('tests SEARCH_SUCCESS true', () => {
    const action = {
      type: SEARCH_SUCCESS,
      payload: [{}],
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
      rows: [{}],
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests SEARCH_SUCCESS false', () => {
    const action = {
      type: SEARCH_SUCCESS,
      payload: false,
    };
    const initialState = {
      pending: false,
      success: true,
      error: null,
      rows: [],
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
      rows: false,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('tests SEARCH_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const action = {
      type: SEARCH_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
      rows: []
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests SEARCH_CLEAR', () => {
    const action = {
      type: SEARCH_CLEAR,
    };
    const initialState = {
      pending: false,
      success: true,
      error: null,
      rows: [],
    };
    const expectedState = {
      pending: false,
      success: false,
      error: null,
      rows: [],
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
      rows: [],
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});
