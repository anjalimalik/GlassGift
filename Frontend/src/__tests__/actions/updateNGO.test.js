import configureStore from 'redux-mock-store';
import {
  UPDATE_NGO_PENDING, UPDATE_NGO_SUCCESS, UPDATE_NGO_ERROR, UPDATE_NGO_CLEAR,
  updateNGOPending, updateNGOSuccess, updateNGOError, updateNGOClear,
} from '../../actions/updateNGO';

const mockStore = configureStore();
const store = mockStore();

describe('Update NGO Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests UPDATE_NGO_PENDING true', () => {
    const expectedActions = [{
      type: UPDATE_NGO_PENDING,
      payload: true,
    }];
    store.dispatch(updateNGOPending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_PENDING false', () => {
    const expectedActions = [{
      type: UPDATE_NGO_PENDING,
      payload: false,
    }];
    store.dispatch(updateNGOPending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_SUCCESS true', () => {
    const expectedActions = [{
      type: UPDATE_NGO_SUCCESS,
      payload: true,
    }];
    store.dispatch(updateNGOSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_SUCCESS false', () => {
    const expectedActions = [{
      type: UPDATE_NGO_SUCCESS,
      payload: false,
    }];
    store.dispatch(updateNGOSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_ERROR', () => {
    const error = new Error('Error updating!');
    const expectedActions = [{
      type: UPDATE_NGO_ERROR,
      payload: error,
    }];
    store.dispatch(updateNGOError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_CLEAR', () => {
    const expectedActions = [{
      type: UPDATE_NGO_CLEAR,
    }];
    store.dispatch(updateNGOClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
