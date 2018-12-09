import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import {
  userInfoActions,
  userInfoEditActions,
  settingCenterActions,
  loginActions,
  registerActions,
} from '@/user';

const initialState = Immutable.Map({
  info: Immutable.Map(),
});

function saveUserInfo(state, action) {
  return state.set('info', Immutable.Map(action.payload.data));
}

export default handleActions({
  [`${userInfoActions.getUserInfo}_FULFILLED`]: saveUserInfo,
  [`${settingCenterActions.logoutAction}_PENDING`]:
    state => state.update('info', info => info.clear()),
  [`${loginActions.loginForLocal}_FULFILLED`]: saveUserInfo,
  [`${registerActions.registerForLocal}_FULFILLED`]: saveUserInfo,
  [`${userInfoEditActions.uploadAvatar}_FULFILLED`]:
    (state, action) => state.setIn(['info', 'avatar'], action.payload.data),
  [`${userInfoEditActions.changeUserInfo}_PENDING`]:
    (state, action) => state.setIn(['info', 'name'], action.payload.name),
}, initialState);
