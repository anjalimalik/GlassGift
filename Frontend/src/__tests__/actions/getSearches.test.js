import configureStore from 'redux-mock-store';
import {
  GET_SEARCHES_PENDING, GET_SEARCHES_SUCCESS, GET_SEARCHES_ERROR, GET_SEARCHES_CLEAR,
  getSearchesPending, getSearchesSuccess, getSearchesError, getSearchesClear,
} from '../../actions/getSearches';

const mockStore = configureStore();
const store = mockStore();

describe('Get Searches Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests GET_SEARCHES_PENDING true', () => {
    const expectedActions = [{
      type: GET_SEARCHES_PENDING,
      payload: true,
    }];
    store.dispatch(getSearchesPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_SEARCHES_PENDING false', () => {
    const expectedActions = [{
      type: GET_SEARCHES_PENDING,
      payload: false,
    }];
    store.dispatch(getSearchesPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_SEARCHES_SUCCESS true', () => {
    const expectedActions = [{
      type: GET_SEARCHES_SUCCESS,
      payload: true,
    }];
    store.dispatch(getSearchesSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_SEARCHES_SUCCESS false', () => {
    const expectedActions = [{
      type: GET_SEARCHES_SUCCESS,
      payload: false,
    }];
    store.dispatch(getSearchesSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_SEARCHES_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const expectedActions = [{
      type: GET_SEARCHES_ERROR,
      payload: error,
    }];
    store.dispatch(getSearchesError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_SEARCHES_CLEAR', () => {
    const expectedActions = [{
      type: GET_SEARCHES_CLEAR,
    }];
    store.dispatch(getSearchesClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
