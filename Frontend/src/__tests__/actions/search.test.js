import configureStore from 'redux-mock-store';
import {
  SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_CLEAR,
  searchPending, searchSuccess, searchError, searchClear,
} from '../../actions/search';

const mockStore = configureStore();
const store = mockStore();

describe('Confirm Email Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests SEARCH_PENDING true', () => {
    const expectedActions = [{
      type: SEARCH_PENDING,
      payload: true,
    }];
    store.dispatch(searchPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SEARCH_PENDING false', () => {
    const expectedActions = [{
      type: SEARCH_PENDING,
      payload: false,
    }];
    store.dispatch(searchPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SEARCH_SUCCESS true', () => {
    const expectedActions = [{
      type: SEARCH_SUCCESS,
      payload: true,
    }];
    store.dispatch(searchSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SEARCH_SUCCESS false', () => {
    const expectedActions = [{
      type: SEARCH_SUCCESS,
      payload: false,
    }];
    store.dispatch(searchSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SEARCH_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const expectedActions = [{
      type: SEARCH_ERROR,
      payload: error,
    }];
    store.dispatch(searchError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests SEARCH_CLEAR', () => {
    const expectedActions = [{
      type: SEARCH_CLEAR,
    }];
    store.dispatch(searchClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
