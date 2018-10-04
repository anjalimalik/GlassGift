import {SEARCH} from '../actions/search';

const initialState = {contents: ['ngo1', 'ngo2'], value: '', ngos: []};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH: {
      const {value} = action;
      const ngos = state.contents.filter((val) => val.includes(value));
      return {...state, value, ngos};
    }
    default:
      return state;
  }
}