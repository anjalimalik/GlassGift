import configureStore from 'redux-mock-store';
import {
  GET_NGO_PENDING, GET_NGO_SUCCESS, GET_NGO_ERROR, GET_NGO_CLEAR,
  getNGOPending, getNGOSuccess, getNGOError, getNGOClear,
} from '../../actions/getNGO';

const mockStore = configureStore();
const store = mockStore();

describe('Get NGO Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests GET_NGO_PENDING true', () => {
    const expectedActions = [{
      type: GET_NGO_PENDING,
      payload: true,
    }];
    store.dispatch(getNGOPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_PENDING false', () => {
    const expectedActions = [{
      type: GET_NGO_PENDING,
      payload: false,
    }];
    store.dispatch(getNGOPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_SUCCESS true', () => {
    const expectedActions = [{
      type: GET_NGO_SUCCESS,
      payload: true,
    }];
    store.dispatch(getNGOSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_SUCCESS false', () => {
    const expectedActions = [{
      type: GET_NGO_SUCCESS,
      payload: false,
    }];
    store.dispatch(getNGOSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_ERROR', () => {
    const error = new Error('Error forgetting Password!');
    const expectedActions = [{
      type: GET_NGO_ERROR,
      payload: error,
    }];
    store.dispatch(getNGOError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_CLEAR', () => {
    const expectedActions = [{
      type: GET_NGO_CLEAR,
    }];
    store.dispatch(getNGOClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
