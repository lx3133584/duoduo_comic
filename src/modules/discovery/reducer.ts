import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { discoveryListActions, rankItemListActions, classItemListActions } from '@/discovery';

const initialState = Immutable.Record({
  class_item_id: 1,
  class_list: Immutable.List<Comic.ClassItem>(),
  class_item_list: Immutable.List<Comic>(),
  rank_item_type: 0,
  rank_item_list: Immutable.List<Comic>(),
})();
export type StateType = typeof initialState;

export default handleActions({
  [`${discoveryListActions.getClassList}_FULFILLED`]:
    (state, action: any) => state.set('class_list', Immutable.List(action.payload.data)),
  [`${rankItemListActions.getRankItemList}_PENDING`]: (state, action: any) => state.withMutations((map) => {
    const { id } = action.payload;
    if (id === state.get('rank_item_type')) return;
    map.set('rank_item_type', id)
      .update('rank_item_list', (list) => list.clear());
  }),
  [`${rankItemListActions.getRankItemList}_FULFILLED`]: (state, action: any) => state.withMutations((map) => {
    if (!action.meta.page) {
      map.update('rank_item_list', (list) => list.clear());
    }
    map.update('rank_item_list', (list) => list.concat(...action.payload.data));
  }),
  [`${classItemListActions.getClassItemList}_PENDING`]: (state, action: any) => state.withMutations((map) => {
    const { id } = action.payload;
    if (id === state.get('class_item_id')) return;
    map.set('class_item_id', id)
      .update('class_item_list', (list) => list.clear());
  }),
  [`${classItemListActions.getClassItemList}_FULFILLED`]: (state, action: any) => state.withMutations((map) => {
    if (!action.meta.page) {
      map.update('class_item_list', (list) => list.clear());
    }
    map.update('class_item_list', (list) => list.concat(...action.payload.data));
  }),
}, initialState);
