import configureStore from 'redux-mock-store';
import {
  UPDATE_NGO_NOTICE_PENDING, UPDATE_NGO_NOTICE_SUCCESS, UPDATE_NGO_NOTICE_ERROR, UPDATE_NGO_NOTICE_CLEAR,
  updateNGONoticePending, updateNGONoticeSuccess, updateNGONoticeError, updateNGONoticeClear,
} from '../../actions/updateNGONotice';

const mockStore = configureStore();
const store = mockStore();

describe('Update NGO Notice Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests UPDATE_NGO_NOTICE_PENDING true', () => {
    const expectedActions = [{
      type: UPDATE_NGO_NOTICE_PENDING,
      payload: true,
    }];
    store.dispatch(updateNGONoticePending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_NOTICE_PENDING false', () => {
    const expectedActions = [{
      type: UPDATE_NGO_NOTICE_PENDING,
      payload: false,
    }];
    store.dispatch(updateNGONoticePending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_NOTICE_SUCCESS true', () => {
    const expectedActions = [{
      type: UPDATE_NGO_NOTICE_SUCCESS,
      payload: true,
    }];
    store.dispatch(updateNGONoticeSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_NOTICE_SUCCESS false', () => {
    const expectedActions = [{
      type: UPDATE_NGO_NOTICE_SUCCESS,
      payload: false,
    }];
    store.dispatch(updateNGONoticeSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_NOTICE_ERROR', () => {
    const error = new Error('Error updating!');
    const expectedActions = [{
      type: UPDATE_NGO_NOTICE_ERROR,
      payload: error,
    }];
    store.dispatch(updateNGONoticeError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests UPDATE_NGO_NOTICE_CLEAR', () => {
    const expectedActions = [{
      type: UPDATE_NGO_NOTICE_CLEAR,
    }];
    store.dispatch(updateNGONoticeClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
