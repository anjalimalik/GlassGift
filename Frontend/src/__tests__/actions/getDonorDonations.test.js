import configureStore from 'redux-mock-store';
import {
  GET_DONOR_DONATIONS_PENDING, GET_DONOR_DONATIONS_SUCCESS, GET_DONOR_DONATIONS_ERROR, GET_DONOR_DONATIONS_CLEAR,
  getDonorDonationsPending, getDonorDonationsSuccess, getDonorDonationsError, getDonorDonationsClear,
} from '../../actions/getDonorDonations';

const mockStore = configureStore();
const store = mockStore();

describe('Confirm Email Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests GET_DONOR_DONATIONS_PENDING true', () => {
    const expectedActions = [{
      type: GET_DONOR_DONATIONS_PENDING,
      payload: true,
    }];
    store.dispatch(getDonorDonationsPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_DONOR_DONATIONS_PENDING false', () => {
    const expectedActions = [{
      type: GET_DONOR_DONATIONS_PENDING,
      payload: false,
    }];
    store.dispatch(getDonorDonationsPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_DONOR_DONATIONS_SUCCESS true', () => {
    const expectedActions = [{
      type: GET_DONOR_DONATIONS_SUCCESS,
      payload: true,
    }];
    store.dispatch(getDonorDonationsSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_DONOR_DONATIONS_SUCCESS false', () => {
    const expectedActions = [{
      type: GET_DONOR_DONATIONS_SUCCESS,
      payload: false,
    }];
    store.dispatch(getDonorDonationsSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_DONOR_DONATIONS_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const expectedActions = [{
      type: GET_DONOR_DONATIONS_ERROR,
      payload: error,
    }];
    store.dispatch(getDonorDonationsError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_DONOR_DONATIONS_CLEAR', () => {
    const expectedActions = [{
      type: GET_DONOR_DONATIONS_CLEAR,
    }];
    store.dispatch(getDonorDonationsClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
