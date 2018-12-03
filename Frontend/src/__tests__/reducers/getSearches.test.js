import reducer from '../../reducers/getSearches';
import {
  GET_SEARCHES_PENDING, GET_SEARCHES_SUCCESS, GET_SEARCHES_ERROR, GET_SEARCHES_CLEAR,
} from '../../actions/getSearches';

describe('Get NGO Reducer', () => {
  it('tests GET_SEARCHES_PENDING true', () => {
    const action = {
      type: GET_SEARCHES_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests GET_SEARCHES_PENDING false', () => {
    const action = {
      type: GET_SEARCHES_PENDING,
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

  it('tests GET_SEARCHES_SUCCESS true', () => {
    const action = {
      type: GET_SEARCHES_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests GET_SEARCHES_SUCCESS false', () => {
    const action = {
      type: GET_SEARCHES_SUCCESS,
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

  it('tests GET_SEARCHES_ERROR', () => {
    const error = new Error('Error signing up!');
    const action = {
      type: GET_SEARCHES_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests GET_SEARCHES_CLEAR', () => {
    const action = {
      type: GET_SEARCHES_CLEAR,
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
