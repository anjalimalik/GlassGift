import configureStore from 'redux-mock-store';
import {
  DONATE_PENDING, DONATE_SUCCESS, DONATE_ERROR, DONATE_CLEAR,
  donatePending, donateSuccess, donateError, donateClear,
} from '../../actions/donate';

const mockStore = configureStore();
const store = mockStore();

describe('Confirm Email Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests DONATE_PENDING true', () => {
    const expectedActions = [{
      type: DONATE_PENDING,
      payload: true,
    }];
    store.dispatch(donatePending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATE_PENDING false', () => {
    const expectedActions = [{
      type: DONATE_PENDING,
      payload: false,
    }];
    store.dispatch(donatePending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATE_SUCCESS true', () => {
    const expectedActions = [{
      type: DONATE_SUCCESS,
      payload: true,
    }];
    store.dispatch(donateSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATE_SUCCESS false', () => {
    const expectedActions = [{
      type: DONATE_SUCCESS,
      payload: false,
    }];
    store.dispatch(donateSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATE_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const expectedActions = [{
      type: DONATE_ERROR,
      payload: error,
    }];
    store.dispatch(donateError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests DONATE_CLEAR', () => {
    const expectedActions = [{
      type: DONATE_CLEAR,
    }];
    store.dispatch(donateClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
