import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { searchListActions } from '.';

const initialState = Immutable.Map({
  keyword: '',
  list: Immutable.List(),
});
export default handleActions({
  [`${searchListActions.getSearchList}_FULFILLED`]: (state, action) => {
    if (!action.payload.page) {
      state = state.update('list', list => list.clear());
    }
    if (action.payload.keyword) {
      state = state.set('keyword', action.payload.keyword);
    }
    return state.update('list', oldList => oldList.concat(action.payload.result.data));
  },
}, initialState);
