import reducer from '../../reducers/getNGONotice';
import {
  GET_NGO_NOTICE_PENDING, GET_NGO_NOTICE_SUCCESS, GET_NGO_NOTICE_ERROR, GET_NGO_NOTICE_CLEAR,
} from '../../actions/getNGONotice';

describe('Get NGO Notice Reducer', () => {
  it('tests GET_NGO_NOTICE_PENDING true', () => {
    const action = {
      type: GET_NGO_NOTICE_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests GET_NGO_NOTICE_PENDING false', () => {
    const action = {
      type: GET_NGO_NOTICE_PENDING,
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

  it('tests GET_NGO_NOTICE_SUCCESS true', () => {
    const action = {
      type: GET_NGO_NOTICE_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests GET_NGO_NOTICE_SUCCESS false', () => {
    const action = {
      type: GET_NGO_NOTICE_SUCCESS,
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

  it('tests GET_NGO_NOTICE_ERROR', () => {
    const error = new Error('Error signing up!');
    const action = {
      type: GET_NGO_NOTICE_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests GET_NGO_NOTICE_CLEAR', () => {
    const action = {
      type: GET_NGO_NOTICE_CLEAR,
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
