import reducer from '../../reducers/getNGO';
import {
  GET_NGO_PENDING, GET_NGO_SUCCESS, GET_NGO_ERROR, GET_NGO_CLEAR,
} from '../../actions/getNGO';

describe('Get NGO Reducer', () => {
  it('tests GET_NGO_PENDING true', () => {
    const action = {
      type: GET_NGO_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests GET_NGO_PENDING false', () => {
    const action = {
      type: GET_NGO_PENDING,
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

  it('tests GET_NGO_SUCCESS true', () => {
    const action = {
      type: GET_NGO_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests GET_NGO_SUCCESS false', () => {
    const action = {
      type: GET_NGO_SUCCESS,
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

  it('tests GET_NGO_ERROR', () => {
    const error = new Error('Error signing up!');
    const action = {
      type: GET_NGO_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests GET_NGO_CLEAR', () => {
    const action = {
      type: GET_NGO_CLEAR,
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
