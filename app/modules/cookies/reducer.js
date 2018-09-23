import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { getAllCookies } from './actions';

const initialState = Immutable.Map({
  csrfToken: '',
  SESS: '',
});

export default handleActions({
  [`${getAllCookies}_FULFILLED`]: (state, action) => {
    for (const key in action.payload) {
      state = state.set(key, action.payload[key]);
    }
    return state;
  },
}, initialState);
