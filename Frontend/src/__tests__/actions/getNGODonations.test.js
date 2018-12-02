import configureStore from 'redux-mock-store';
import {
  GET_NGO_DONATIONS_PENDING, GET_NGO_DONATIONS_SUCCESS, GET_NGO_DONATIONS_ERROR, GET_NGO_DONATIONS_CLEAR,
  getNGODonationsPending, getNGODonationsSuccess, getNGODonationsError, getNGODonationsClear,
} from '../../actions/getNGODonations';

const mockStore = configureStore();
const store = mockStore();

describe('Get NGO Donations Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests GET_NGO_DONATIONS_PENDING true', () => {
    const expectedActions = [{
      type: GET_NGO_DONATIONS_PENDING,
      payload: true,
    }];
    store.dispatch(getNGODonationsPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_DONATIONS_PENDING false', () => {
    const expectedActions = [{
      type: GET_NGO_DONATIONS_PENDING,
      payload: false,
    }];
    store.dispatch(getNGODonationsPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_DONATIONS_SUCCESS true', () => {
    const expectedActions = [{
      type: GET_NGO_DONATIONS_SUCCESS,
      payload: true,
    }];
    store.dispatch(getNGODonationsSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_DONATIONS_SUCCESS false', () => {
    const expectedActions = [{
      type: GET_NGO_DONATIONS_SUCCESS,
      payload: false,
    }];
    store.dispatch(getNGODonationsSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_DONATIONS_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const expectedActions = [{
      type: GET_NGO_DONATIONS_ERROR,
      payload: error,
    }];
    store.dispatch(getNGODonationsError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_DONATIONS_CLEAR', () => {
    const expectedActions = [{
      type: GET_NGO_DONATIONS_CLEAR,
    }];
    store.dispatch(getNGODonationsClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
