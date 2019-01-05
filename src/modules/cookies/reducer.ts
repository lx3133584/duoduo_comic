import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { getAllCookies } from './actions';

const initialState = Immutable.Record({
  csrfToken: '',
  SESS: '',
})();
export type StateType = typeof initialState;

export default handleActions({
  [`${getAllCookies}_FULFILLED`]: (state, action: any) => state.withMutations((map) => {
    for (const key of Object.keys(action.payload)) {
      if (key !== 'csrfToken' && key !== 'SESS') break;
      map.set(key, action.payload[key]);
    }
  }),
}, initialState);
