import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { getAllCookies } from './actions';

const initialState = Immutable.Map({
  csrfToken: '',
  SESS: '',
});

export default handleActions({
  [`${getAllCookies}_FULFILLED`]: (state, action) => state.withMutations((map) => {
    for (const key in action.payload) {
      map.set(key, action.payload[key]);
    }
  }),
}, initialState);
