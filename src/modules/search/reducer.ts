import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { searchListActions } from '.';

const initialState = Immutable.Record({
  keyword: '',
  list: Immutable.List<Comic>(),
})();
export type StateType = typeof initialState;
export default handleActions({
  [`${searchListActions.getSearchList}_FULFILLED`]: (state, action: any) => state.withMutations((map) => {
    const { page, keyword, result } = action.payload;
    if (!page) map.update('list', (list) => list.clear());
    if (keyword) map.set('keyword', keyword);
    map.update('list', (oldList) => oldList.concat(...result.data));
  }),
  [searchListActions.clearSearchList]: (state) => state.withMutations(map => {
    map.update('list', (list) => list.clear());
    map.set('keyword', '');
  }),
}, initialState);
