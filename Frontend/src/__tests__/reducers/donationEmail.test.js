import reducer from '../../reducers/donationEmail';
import {
  DONATION_EMAIL_PENDING, DONATION_EMAIL_SUCCESS, DONATION_EMAIL_ERROR, DONATION_EMAIL_CLEAR,
} from '../../actions/donationEmail';

describe('Confirm Email Reducer', () => {
  it('tests DONATION_EMAIL_PENDING true', () => {
    const action = {
      type: DONATION_EMAIL_PENDING,
      payload: true,
    };
    const expectedState = {
      pending: true,
      success: false,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests DONATION_EMAIL_PENDING false', () => {
    const action = {
      type: DONATION_EMAIL_PENDING,
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

  it('tests DONATION_EMAIL_SUCCESS true', () => {
    const action = {
      type: DONATION_EMAIL_SUCCESS,
      payload: true,
    };
    const expectedState = {
      pending: false,
      success: true,
      error: null,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests DONATION_EMAIL_SUCCESS false', () => {
    const action = {
      type: DONATION_EMAIL_SUCCESS,
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

  it('tests DONATION_EMAIL_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const action = {
      type: DONATION_EMAIL_ERROR,
      payload: error,
    };
    const expectedState = {
      pending: false,
      success: false,
      error: error.message,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('tests DONATION_EMAIL_CLEAR', () => {
    const action = {
      type: DONATION_EMAIL_CLEAR,
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
