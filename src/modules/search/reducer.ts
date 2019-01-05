import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { searchListActions } from '@/search';

const initialState = Immutable.Record({
  keyword: '',
  list: Immutable.List<Comic>(),
})();
export type StateType = typeof initialState;
export default handleActions({
  [`${searchListActions.getSearchList}_FULFILLED`]: (state, action: any) => state.withMutations((map) => {
    if (!action.payload.page) {
      map.update('list', (list) => list.clear());
    }
    if (action.payload.keyword) {
      map.set('keyword', action.payload.keyword);
    }
    map.update('list', (oldList) => oldList.concat(action.payload.result.data));
  }),
}, initialState);
