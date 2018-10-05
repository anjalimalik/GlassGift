import configureStore from 'redux-mock-store';
import {
  GET_NGO_NOTICE_PENDING, GET_NGO_NOTICE_SUCCESS, GET_NGO_NOTICE_ERROR, GET_NGO_NOTICE_CLEAR,
  getNGONoticePending, getNGONoticeSuccess, getNGONoticeError, getNGONoticeClear,
} from '../../actions/getNGONotice';

const mockStore = configureStore();
const store = mockStore();

describe('Get NGO Notice Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('tests GET_NGO_NOTICE_PENDING true', () => {
    const expectedActions = [{
      type: GET_NGO_NOTICE_PENDING,
      payload: true,
    }];
    store.dispatch(getNGONoticePending(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_NOTICE_PENDING false', () => {
    const expectedActions = [{
      type: GET_NGO_NOTICE_PENDING,
      payload: false,
    }];
    store.dispatch(getNGONoticePending(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_NOTICE_SUCCESS true', () => {
    const expectedActions = [{
      type: GET_NGO_NOTICE_SUCCESS,
      payload: true,
    }];
    store.dispatch(getNGONoticeSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_NOTICE_SUCCESS false', () => {
    const expectedActions = [{
      type: GET_NGO_NOTICE_SUCCESS,
      payload: false,
    }];
    store.dispatch(getNGONoticeSuccess(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_NOTICE_ERROR', () => {
    const error = new Error('Error updating!');
    const expectedActions = [{
      type: GET_NGO_NOTICE_ERROR,
      payload: error,
    }];
    store.dispatch(getNGONoticeError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('tests GET_NGO_NOTICE_CLEAR', () => {
    const expectedActions = [{
      type: GET_NGO_NOTICE_CLEAR,
    }];
    store.dispatch(getNGONoticeClear());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
