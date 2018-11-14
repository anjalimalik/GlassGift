import configureStore from 'redux-mock-store';
import {
  DONATION_EMAIL_PENDING, DONATION_EMAIL_SUCCESS, DONATION_EMAIL_ERROR, DONATION_EMAIL_CLEAR,
  donationEmailPending, donationEmailSuccess, donationEmailError, donationEmailClear,
} from '../../actions/donationEmail';

const mockStore = configureStore();
const store = mockStore();

describe('Confirm Email Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests DONATION_EMAIL_PENDING true', () => {
    const expectedActions = [{
      type: DONATION_EMAIL_PENDING,
      payload: true,
    }];
    store.dispatch(donationEmailPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATION_EMAIL_PENDING false', () => {
    const expectedActions = [{
      type: DONATION_EMAIL_PENDING,
      payload: false,
    }];
    store.dispatch(donationEmailPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATION_EMAIL_SUCCESS true', () => {
    const expectedActions = [{
      type: DONATION_EMAIL_SUCCESS,
      payload: true,
    }];
    store.dispatch(donationEmailSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATION_EMAIL_SUCCESS false', () => {
    const expectedActions = [{
      type: DONATION_EMAIL_SUCCESS,
      payload: false,
    }];
    store.dispatch(donationEmailSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATION_EMAIL_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const expectedActions = [{
      type: DONATION_EMAIL_ERROR,
      payload: error,
    }];
    store.dispatch(donationEmailError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATION_EMAIL_CLEAR', () => {
    const expectedActions = [{
      type: DONATION_EMAIL_CLEAR,
    }];
    store.dispatch(donationEmailClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
