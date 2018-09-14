import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { favoritesListActions } from '.';
import { comicDetailActions } from '../comic';
import { userInfoActions } from '../user';

const initialState = Immutable.Map({
  favorites_list: Immutable.List(),
  history_list: Immutable.List(),
});
export default handleActions({
  [`${favoritesListActions.getFavoritesList}_FULFILLED`]:
    (state, action) => state.set('favorites_list', Immutable.List(action.payload.data)),
  [`${favoritesListActions.getHistoryList}_FULFILLED`]: (state, action) => {
    if (!action.payload.page) {
      state = state.update('history_list', list => list.clear());
    }
    return state.update('history_list', list => list.concat(action.payload.result.data));
  },
  [`${favoritesListActions.removeHistory}_PENDING`]:
    (state, action) => state.update('history_list', list => list.filter((item => item.id !== action.payload))),
  [`${comicDetailActions.removeFavorite}_PENDING`]:
    (state, action) => state.update('favorites_list', list => list.filter((item => item.id !== action.payload))),
  [`${userInfoActions.logoutAction}_PENDING`]: (state) => {
    state = state.update('history_list', list => list.clear());
    return state.update('favorites_list', list => list.clear());
  },
}, initialState);
